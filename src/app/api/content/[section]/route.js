import { NextResponse } from 'next/server';

// Force dynamic API behavior
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Valid sections to prevent unauthorized access
const VALID_SECTIONS = ['blogs', 'events', 'newsletter', 'teams'];

// Reduced cache for real-time updates
const contentCache = new Map();
const CACHE_TTL = 30 * 1000; // Reduced to 30 seconds for real-time feel

// Helper function to validate section
function validateSection(section) {
    if (!section || typeof section !== 'string') {
        return false;
    }
    return VALID_SECTIONS.includes(section.toLowerCase());
}

// Helper function to validate environment variables
function validateEnvVars() {
    const required = ['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_TOKEN'];
    const missing = required.filter(env => !process.env[env]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

// Helper function to get GitHub headers
function getGitHubHeaders() {
    return {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NextJS-CMS-App',
        'X-GitHub-Api-Version': '2022-11-28'
    };
}

// Helper function to get cache key
function getCacheKey(section) {
    return `content_${section}`;
}

// Helper function to check if cache is valid
function isCacheValid(cacheEntry) {
    return cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_TTL;
}

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const { section } = resolvedParams;

        // Validate section
        if (!validateSection(section)) {
            return NextResponse.json(
                { error: 'Invalid section. Must be one of: ' + VALID_SECTIONS.join(', ') },
                { status: 400 }
            );
        }

        // Validate environment variables
        validateEnvVars();

        // For real-time updates, you might want to skip cache entirely
        const skipCache = request.nextUrl.searchParams.get('fresh') === 'true';

        if (!skipCache) {
            // Check cache first (with shorter TTL)
            const cacheKey = getCacheKey(section);
            const cachedContent = contentCache.get(cacheKey);

            if (isCacheValid(cachedContent)) {
                console.log(`Cache hit for section: ${section}`);
                return NextResponse.json(cachedContent.data, {
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                        'X-Cache': 'HIT'
                    }
                });
            }
        }

        console.log(`Fetching fresh content for section: ${section}`);

        // Fetch from GitHub
        const response = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/${section}.json`,
            {
                headers: getGitHubHeaders(),
                // Add cache busting
                cache: 'no-store',
                signal: AbortSignal.timeout(10000) // 10 seconds
            }
        );

        let content;

        if (!response.ok) {
            if (response.status === 404) {
                console.log(`File not found for section: ${section}, returning default data`);
                content = getDefaultData(section);
            } else {
                const errorText = await response.text();
                console.error('GitHub GET error:', response.status, errorText);

                // Return cached content if available, even if expired
                const cacheKey = getCacheKey(section);
                const cachedContent = contentCache.get(cacheKey);
                if (cachedContent) {
                    console.log('Returning stale cache due to GitHub error');
                    return NextResponse.json(cachedContent.data, {
                        headers: { 'X-Cache': 'STALE' }
                    });
                }

                throw new Error(`GitHub API error: ${response.status}`);
            }
        } else {
            const data = await response.json();

            // Validate that content exists and is base64
            if (!data.content) {
                throw new Error('No content found in GitHub response');
            }

            try {
                content = JSON.parse(Buffer.from(data.content, 'base64').toString());

                // Validate content structure
                if (typeof content !== 'object' || content === null) {
                    throw new Error('Invalid content structure');
                }
            } catch (parseError) {
                console.error('Error parsing content:', parseError);
                content = getDefaultData(section);
            }
        }

        // Store in cache (even with shorter TTL)
        if (!skipCache) {
            const cacheKey = getCacheKey(section);
            contentCache.set(cacheKey, {
                data: content,
                timestamp: Date.now()
            });
        }

        return NextResponse.json(content, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'X-Cache': 'MISS'
            }
        });

    } catch (error) {
        console.error('Error in GET /api/content/[section]:', error);

        // Try to return cached content as fallback
        let section;
        try {
            const resolvedParams = await params;
            section = resolvedParams?.section;
        } catch (paramError) {
            console.error('Error resolving params:', paramError);
        }

        if (section) {
            const cacheKey = getCacheKey(section);
            const cachedContent = contentCache.get(cacheKey);

            if (cachedContent) {
                console.log('Returning cached content due to error');
                return NextResponse.json(cachedContent.data, {
                    headers: { 'X-Cache': 'ERROR_FALLBACK' }
                });
            }

            // Last resort: return default data
            if (validateSection(section)) {
                return NextResponse.json(getDefaultData(section));
            }
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;
        const { section } = resolvedParams;

        // Validate section
        if (!validateSection(section)) {
            return NextResponse.json(
                { error: 'Invalid section. Must be one of: ' + VALID_SECTIONS.join(', ') },
                { status: 400 }
            );
        }

        // Validate environment variables
        validateEnvVars();

        // Parse and validate request body
        let newContent;
        try {
            newContent = await request.json();
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400 }
            );
        }

        // Validate content structure
        if (!newContent || typeof newContent !== 'object') {
            return NextResponse.json(
                { error: 'Content must be a valid object' },
                { status: 400 }
            );
        }

        // Validate required fields
        const requiredFields = ['title', 'content'];
        const missingFields = requiredFields.filter(field => !newContent[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        console.log('Attempting to save to GitHub:', section);

        // Get current file SHA with retry logic
        let sha = null;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                const getResponse = await fetch(
                    `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/${section}.json`,
                    {
                        headers: getGitHubHeaders(),
                        cache: 'no-store', // Ensure we get latest
                        signal: AbortSignal.timeout(10000)
                    }
                );

                if (getResponse.ok) {
                    const currentFile = await getResponse.json();
                    sha = currentFile.sha;
                    console.log('Got existing file SHA:', sha);
                    break;
                } else if (getResponse.status === 404) {
                    console.log('File does not exist, will create new file');
                    break;
                } else {
                    throw new Error(`Failed to get file SHA: ${getResponse.status}`);
                }
            } catch (error) {
                retryCount++;
                console.error(`Retry ${retryCount} failed:`, error);

                if (retryCount === maxRetries) {
                    throw error;
                }

                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            }
        }

        // Prepare update payload
        const updatePayload = {
            message: `Update ${section} content via admin panel - ${new Date().toISOString()}`,
            content: Buffer.from(JSON.stringify(newContent, null, 2)).toString('base64'),
            branch: process.env.GITHUB_BRANCH || 'main'
        };

        // Include SHA if file exists
        if (sha) {
            updatePayload.sha = sha;
        }

        // Update file with retry logic
        retryCount = 0;
        let updateResult;

        while (retryCount < maxRetries) {
            try {
                const updateResponse = await fetch(
                    `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/${section}.json`,
                    {
                        method: 'PUT',
                        headers: {
                            ...getGitHubHeaders(),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatePayload),
                        signal: AbortSignal.timeout(15000) // Longer timeout for PUT
                    }
                );

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json();
                    console.error('GitHub PUT error:', updateResponse.status, errorData);
                    throw new Error(`GitHub API error: ${updateResponse.status} - ${errorData.message || 'Unknown error'}`);
                }

                updateResult = await updateResponse.json();
                break;

            } catch (error) {
                retryCount++;
                console.error(`Update retry ${retryCount} failed:`, error);

                if (retryCount === maxRetries) {
                    throw error;
                }

                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            }
        }

        console.log('Successfully saved to GitHub:', updateResult);

        // Clear ALL cache entries to ensure fresh data
        contentCache.clear();
        console.log(`All cache cleared after updating: ${section}`);

        // Optionally trigger revalidation of related paths
        try {
            // If you have revalidation setup, you can trigger it here
            // await revalidatePath(`/${section}`);
        } catch (revalidateError) {
            console.warn('Revalidation failed:', revalidateError);
        }

        return NextResponse.json({
            success: true,
            message: 'Content updated successfully',
            timestamp: new Date().toISOString(),
            section: section
        });

    } catch (error) {
        console.error('Error in PUT /api/content/[section]:', error);

        return NextResponse.json({
            error: error.message || 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}

function getDefaultData(section) {
    const defaults = {
        blogs: {
            title: "Our Blog",
            subtitle: "Latest insights and updates",
            content: "Welcome to our blog where we share the latest insights, industry trends, and company updates.",
            image: null,
            meta: "Updated regularly with fresh content"
        },
        events: {
            title: "Upcoming Events",
            subtitle: "Join us at our next event",
            content: "We regularly host events, workshops, and conferences. Stay tuned for upcoming opportunities to connect and learn.",
            image: null,
            meta: "Events are updated monthly"
        },
        newsletter: {
            title: "Newsletter & News",
            subtitle: "Stay informed with our latest news",
            content: "Subscribe to our newsletter to receive the latest company news, industry updates, and valuable insights.",
            image: null,
            meta: "Published monthly"
        },
        teams: {
            title: "Our Team",
            subtitle: "Meet the people behind our success",
            content: "Our diverse team of professionals brings together expertise from various fields to serve our clients with excellence.",
            image: null,
            meta: "Team profiles updated quarterly",
            members: []
        }
    };

    return defaults[section] || {
        title: "Page Not Found",
        subtitle: "Content not available",
        content: "The requested content is not available.",
        image: null,
        meta: "Error loading content"
    };
}