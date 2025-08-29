import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const blogsCache = new Map(); // Optional cache if needed
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

// GET all blog posts
export async function GET() {
    try {
        validateEnvVars();

        // Optional caching
        const cacheEntry = blogsCache.get('posts');
        if (cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_TTL) {
            return NextResponse.json({ posts: cacheEntry.data });
        }

        const response = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog-posts.json`,
            {
                headers: getGitHubHeaders(),
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                // Return empty array if file not found
                return NextResponse.json({ posts: [] });
            }
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }

        const file = await response.json();
        const contentJson = JSON.parse(Buffer.from(file.content, 'base64').toString());
        const posts = contentJson.posts || [];

        // Cache result
        blogsCache.set('posts', { data: posts, timestamp: Date.now() });

        return NextResponse.json({ posts });

    } catch (error) {
        console.error('Error in GET /api/blogs:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// PUT - create or update blog post
export async function PUT(request) {
    try {
        validateEnvVars();

        let requestData;
        try {
            requestData = await request.json();
        } catch {
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }

        const { action, blogPost } = requestData;

        if (!action || !blogPost) {
            return NextResponse.json({ error: 'Missing action or blogPost in request' }, { status: 400 });
        }

        if (!blogPost.title || !blogPost.content || !blogPost.slug) {
            return NextResponse.json({ error: 'Missing required fields: title, content, slug' }, { status: 400 });
        }

        // Fetch current posts and sha for GitHub update
        let currentPosts = [];
        let sha = null;

        const getResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog-posts.json`,
            { headers: getGitHubHeaders(), cache: 'no-store' }
        );

        if (getResponse.ok) {
            const currentFile = await getResponse.json();
            sha = currentFile.sha;
            currentPosts = JSON.parse(Buffer.from(currentFile.content, 'base64').toString()).posts || [];
        } else if (getResponse.status !== 404) {
            throw new Error(`Failed to get current posts: ${getResponse.status}`);
        }

        let updatedPosts;

        if (action === 'create') {
            if (currentPosts.find(post => post.slug === blogPost.slug)) {
                return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 409 });
            }

            const newPost = {
                ...blogPost,
                id: blogPost.id || generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            updatedPosts = [newPost, ...currentPosts];

        } else if (action === 'update') {
            const index = currentPosts.findIndex(post => post.id === blogPost.id || post.slug === blogPost.slug);

            if (index === -1) {
                return NextResponse.json({ error: 'Blog post not found for update' }, { status: 404 });
            }

            updatedPosts = [...currentPosts];
            updatedPosts[index] = { ...updatedPosts[index], ...blogPost, updatedAt: new Date().toISOString() };

        } else {
            return NextResponse.json({ error: 'Invalid action. Must be "create" or "update"' }, { status: 400 });
        }

        // Commit changes to GitHub
        const updatePayload = {
            message: `${action === 'create' ? 'Create' : 'Update'} blog post: ${blogPost.title} - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify({ posts: updatedPosts }, null, 2)).toString('base64'),
            branch: process.env.GITHUB_BRANCH || 'main'
        };

        if (sha) updatePayload.sha = sha;

        const updateResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog-posts.json`,
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

        blogsCache.clear();

        return NextResponse.json({
            success: true,
            message: `Blog post ${action === 'create' ? 'created' : 'updated'} successfully`,
            blogPost: action === 'create' ? updatedPosts[0] : updatedPosts.find(post => post.id === blogPost.id || post.slug === blogPost.slug)
        });

    } catch (error) {
        console.error('Error in PUT /api/blogs:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
