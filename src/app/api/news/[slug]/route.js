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

// DELETE news article by slug or id
export async function DELETE(request, { params }) {
    try {
        validateEnvVars();

        const { slug } = params;

        if (!slug) {
            return NextResponse.json({ error: 'Missing news article slug' }, { status: 400 });
        }

        // Fetch current news articles and sha
        const getResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/news-articles.json`,
            { headers: getGitHubHeaders(), cache: 'no-store' }
        );

        if (!getResponse.ok) {
            if (getResponse.status === 404) {
                return NextResponse.json({ error: 'News articles file not found' }, { status: 404 });
            }
            throw new Error(`Failed to get current articles: ${getResponse.status}`);
        }

        const currentFile = await getResponse.json();
        const sha = currentFile.sha;
        const currentContent = JSON.parse(Buffer.from(currentFile.content, 'base64').toString());
        const currentArticles = currentContent.articles || [];

        // Find news article index
        const articleIndex = currentArticles.findIndex(article => article.id === slug || article.slug === slug);

        if (articleIndex === -1) {
            return NextResponse.json({ error: 'News article not found' }, { status: 404 });
        }

        const deletedArticle = currentArticles[articleIndex];
        const updatedArticles = currentArticles.filter((_, index) => index !== articleIndex);

        // Save updated articles to GitHub
        const updatePayload = {
            message: `Delete news article: ${deletedArticle.title} - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify({ articles: updatedArticles }, null, 2)).toString('base64'),
            sha,
            branch: process.env.GITHUB_BRANCH || 'main'
        };

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

        return NextResponse.json({
            success: true,
            message: 'News article deleted successfully',
            deletedArticle,
        });

    } catch (error) {
        console.error('Error in DELETE /api/news/[slug]:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
