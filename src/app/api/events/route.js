import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const eventsCache = new Map();
const CACHE_TTL = 30 * 1000;

function validateEnvVars() {
    const required = ['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_TOKEN'];
    const missing = required.filter(env => !process.env[env]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

function getGitHubHeaders() {
    return {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NextJS-CMS-App',
        'X-GitHub-Api-Version': '2022-11-28'
    };
}

function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// GET all events
export async function GET() {
    try {
        validateEnvVars();

        // Optional caching
        const cacheEntry = eventsCache.get('events');
        if (cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_TTL) {
            return NextResponse.json({ events: cacheEntry.data });
        }

        const response = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/events.json`,
            {
                headers: getGitHubHeaders(),
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json({ events: [] }); // return empty list if file missing
            }
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }

        const file = await response.json();
        const contentJson = JSON.parse(Buffer.from(file.content, 'base64').toString());
        const events = contentJson.events || [];

        // Cache result
        eventsCache.set('events', { data: events, timestamp: Date.now() });

        return NextResponse.json({ events });

    } catch (error) {
        console.error('Error in GET /api/events:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// PUT create or update event
export async function PUT(request) {
    try {
        validateEnvVars();

        let requestData;
        try {
            requestData = await request.json();
        } catch {
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }

        const { action, event } = requestData;

        if (!action || !event) {
            return NextResponse.json({ error: 'Missing action or event in request' }, { status: 400 });
        }

        if (!event.title || !event.content || !event.slug) {
            return NextResponse.json({ error: 'Missing required fields: title, content, slug' }, { status: 400 });
        }

        // Fetch existing events and SHA
        let currentEvents = [];
        let sha = null;

        const getResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/events.json`,
            { headers: getGitHubHeaders(), cache: 'no-store' }
        );

        if (getResponse.ok) {
            const currentFile = await getResponse.json();
            sha = currentFile.sha;
            currentEvents = JSON.parse(Buffer.from(currentFile.content, 'base64').toString()).events || [];
        } else if (getResponse.status !== 404) {
            throw new Error(`Failed to get current events: ${getResponse.status}`);
        }

        let updatedEvents;

        if (action === 'create') {
            if (currentEvents.find(e => e.slug === event.slug)) {
                return NextResponse.json({ error: 'An event with this slug already exists' }, { status: 409 });
            }

            const newEvent = {
                ...event,
                id: event.id || generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            updatedEvents = [newEvent, ...currentEvents];

        } else if (action === 'update') {
            const index = currentEvents.findIndex(e => e.id === event.id || e.slug === event.slug);

            if (index === -1) {
                return NextResponse.json({ error: 'Event not found for update' }, { status: 404 });
            }

            updatedEvents = [...currentEvents];
            updatedEvents[index] = { ...updatedEvents[index], ...event, updatedAt: new Date().toISOString() };

        } else {
            return NextResponse.json({ error: 'Invalid action. Must be "create" or "update"' }, { status: 400 });
        }

        // Commit changes to GitHub
        const updatePayload = {
            message: `${action === 'create' ? 'Create' : 'Update'} event: ${event.title} - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify({ events: updatedEvents }, null, 2)).toString('base64'),
            branch: process.env.GITHUB_BRANCH || 'main'
        };

        if (sha) updatePayload.sha = sha;

        const updateResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/events.json`,
            {
                method: 'PUT',
                headers: { ...getGitHubHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(updatePayload)
            }
        );

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(`GitHub API error: ${updateResponse.status} - ${errorData.message}`);
        }

        eventsCache.clear();

        return NextResponse.json({
            success: true,
            message: `Event ${action === 'create' ? 'created' : 'updated'} successfully`,
            event: action === 'create' ? updatedEvents[0] : updatedEvents.find(e => e.id === event.id || e.slug === event.slug)
        });

    } catch (error) {
        console.error('Error in PUT /api/events:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
