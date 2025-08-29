import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

// DELETE blog post by slug or id
export async function DELETE(request, { params }) {
    try {
        validateEnvVars();

        const { slug } = params;

        if (!slug) {
            return NextResponse.json({ error: 'Missing blog post slug' }, { status: 400 });
        }

        // Fetch current blog posts and sha
        const getResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog-posts.json`,
            { headers: getGitHubHeaders(), cache: 'no-store' }
        );

        if (!getResponse.ok) {
            if (getResponse.status === 404) {
                return NextResponse.json({ error: 'Blog posts file not found' }, { status: 404 });
            }
            throw new Error(`Failed to get current posts: ${getResponse.status}`);
        }

        const currentFile = await getResponse.json();
        const sha = currentFile.sha;
        const currentContent = JSON.parse(Buffer.from(currentFile.content, 'base64').toString());
        const currentPosts = currentContent.posts || [];

        // Find blog post index
        const postIndex = currentPosts.findIndex(post => post.id === slug || post.slug === slug);

        if (postIndex === -1) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }

        const deletedPost = currentPosts[postIndex];
        const updatedPosts = currentPosts.filter((_, index) => index !== postIndex);

        // Save updated posts to GitHub
        const updatePayload = {
            message: `Delete blog post: ${deletedPost.title} - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify({ posts: updatedPosts }, null, 2)).toString('base64'),
            sha,
            branch: process.env.GITHUB_BRANCH || 'main'
        };

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

        return NextResponse.json({
            success: true,
            message: 'Blog post deleted successfully',
            deletedPost,
        });

    } catch (error) {
        console.error('Error in DELETE /api/blogs/[slug]:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
