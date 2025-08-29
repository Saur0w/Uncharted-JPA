import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const newsCache = new Map(); // Optional cache if needed
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

// GET all news articles
export async function GET() {
    try {
        validateEnvVars();

        // Optional caching
        const cacheEntry = newsCache.get('articles');
        if (cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_TTL) {
            return NextResponse.json({ articles: cacheEntry.data });
        }

        const response = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/news-articles.json`,
            {
                headers: getGitHubHeaders(),
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                // Return empty array if file not found
                return NextResponse.json({ articles: [] });
            }
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }

        const file = await response.json();
        const contentJson = JSON.parse(Buffer.from(file.content, 'base64').toString());
        const articles = contentJson.articles || [];

        // Cache result
        newsCache.set('articles', { data: articles, timestamp: Date.now() });

        return NextResponse.json({ articles });

    } catch (error) {
        console.error('Error in GET /api/news:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// PUT - create or update news article
export async function PUT(request) {
    try {
        validateEnvVars();

        let requestData;
        try {
            requestData = await request.json();
        } catch {
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }

        const { action, article } = requestData;

        if (!action || !article) {
            return NextResponse.json({ error: 'Missing action or article in request' }, { status: 400 });
        }

        if (!article.title || !article.content || !article.slug) {
            return NextResponse.json({ error: 'Missing required fields: title, content, slug' }, { status: 400 });
        }

        // Fetch current articles and sha for GitHub update
        let currentArticles = [];
        let sha = null;

        const getResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/news-articles.json`,
            { headers: getGitHubHeaders(), cache: 'no-store' }
        );

        if (getResponse.ok) {
            const currentFile = await getResponse.json();
            sha = currentFile.sha;
            currentArticles = JSON.parse(Buffer.from(currentFile.content, 'base64').toString()).articles || [];
        } else if (getResponse.status !== 404) {
            throw new Error(`Failed to get current articles: ${getResponse.status}`);
        }

        let updatedArticles;

        if (action === 'create') {
            if (currentArticles.find(existingArticle => existingArticle.slug === article.slug)) {
                return NextResponse.json({ error: 'A news article with this slug already exists' }, { status: 409 });
            }

            const newArticle = {
                ...article,
                id: article.id || generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            updatedArticles = [newArticle, ...currentArticles];

        } else if (action === 'update') {
            const index = currentArticles.findIndex(existingArticle => existingArticle.id === article.id || existingArticle.slug === article.slug);

            if (index === -1) {
                return NextResponse.json({ error: 'News article not found for update' }, { status: 404 });
            }

            updatedArticles = [...currentArticles];
            updatedArticles[index] = { ...updatedArticles[index], ...article, updatedAt: new Date().toISOString() };

        } else {
            return NextResponse.json({ error: 'Invalid action. Must be "create" or "update"' }, { status: 400 });
        }

        // Commit changes to GitHub
        const updatePayload = {
            message: `${action === 'create' ? 'Create' : 'Update'} news article: ${article.title} - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify({ articles: updatedArticles }, null, 2)).toString('base64'),
            branch: process.env.GITHUB_BRANCH || 'main'
        };

        if (sha) updatePayload.sha = sha;

        const updateResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/news-articles.json`,
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

        newsCache.clear();

        return NextResponse.json({
            success: true,
            message: `News article ${action === 'create' ? 'created' : 'updated'} successfully`,
            article: action === 'create' ? updatedArticles[0] : updatedArticles.find(existingArticle => existingArticle.id === article.id || existingArticle.slug === article.slug)
        });

    } catch (error) {
        console.error('Error in PUT /api/news:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
