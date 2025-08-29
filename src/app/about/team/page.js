import { Suspense } from 'react';
import styles from './style.module.scss';
import { notFound } from 'next/navigation';
import TeamImage from "./teamImage";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

async function getContent() {
    let debugInfo = {
        step: 'starting',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        isServer: typeof window === 'undefined'
    };

    try {
        const isServer = typeof window === 'undefined';
        debugInfo.isServer = isServer;

        let baseUrl;
        let urlStrategy = '';

        if (isServer) {
            if (process.env.NEXT_PUBLIC_SITE_URL) {
                baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
                urlStrategy = 'NEXT_PUBLIC_SITE_URL';
            } else if (process.env.VERCEL_URL) {
                baseUrl = `https://${process.env.VERCEL_URL}`;
                urlStrategy = 'VERCEL_URL';
            } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
                baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
                urlStrategy = 'VERCEL_PROJECT_PRODUCTION_URL';
            } else {
                baseUrl = 'http://localhost:3000';
                urlStrategy = 'localhost_fallback';
            }
        } else {
            baseUrl = window.location.origin;
            urlStrategy = 'window.location.origin';
        }

        debugInfo.baseUrl = baseUrl;
        debugInfo.urlStrategy = urlStrategy;
        debugInfo.step = 'url_constructed';

        if (isServer) {
            try {
                console.log('Attempting internal API call...');
                const { GET } = require('../../api/content/[section]/route');
                const mockRequest = { nextUrl: { searchParams: new Map() } };
                const mockParams = Promise.resolve({ section: 'teams' });

                const response = await GET(mockRequest, { params: mockParams });
                const data = await response.json();

                console.log('Internal API call successful:', data);
                debugInfo.method = 'internal_api';
                debugInfo.success = true;

                return {
                    title: data.title || 'Our Team',
                    subtitle: data.subtitle || '',
                    content: data.content || '',
                    image: data.image || null,
                    meta: data.meta || '',
                    members: data.members || [],
                    debugInfo
                };
            } catch (internalError) {
                console.log('⚠️ Internal API call failed, falling back to HTTP:', internalError.message);
                debugInfo.internalApiError = internalError.message;
            }
        }

        const apiUrl = `${baseUrl}/api/content/teams`;
        debugInfo.apiUrl = apiUrl;
        debugInfo.step = 'attempting_fetch';

        console.log('🔍 Debug Info:', JSON.stringify(debugInfo, null, 2));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(apiUrl, {
            signal: controller.signal,
            cache: 'no-store',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });

        clearTimeout(timeoutId);
        debugInfo.step = 'fetch_completed';
        debugInfo.responseStatus = response.status;

        console.log('📡 Response status:', response.status);
        console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            debugInfo.errorText = errorText;
            debugInfo.step = 'response_not_ok';

            console.error('API Error Response:', errorText);
            console.error('Full response:', {
                status: response.status,
                statusText: response.statusText,
                url: response.url
            });

            if (response.status === 404) {
                notFound();
            }
            throw new Error(`Failed to fetch content: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        debugInfo.step = 'json_parsed';
        debugInfo.dataReceived = !!data;
        debugInfo.method = 'http_fetch';
        debugInfo.success = true;

        console.log('Received data:', data);

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data structure received');
        }

        return {
            title: data.title || 'Our Team',
            subtitle: data.subtitle || '',
            content: data.content || '',
            image: data.image || null,
            meta: data.meta || '',
            members: data.members || [],
            debugInfo
        };

    } catch (error) {
        debugInfo.step = 'error_caught';
        debugInfo.error = {
            message: error?.message || 'Unknown error',
            name: error?.name || 'Unknown',
            stack: error?.stack || 'No stack trace',
            toString: error?.toString() || 'No string representation'
        };

        console.error('Error fetching team content:', error);
        console.error('Full error object:', {
            error,
            type: typeof error,
            constructor: error?.constructor?.name,
            isNull: error === null,
            isUndefined: error === undefined
        });
        console.error('Debug Info:', JSON.stringify(debugInfo, null, 2));

        return {
            title: 'Our Team (Error Mode)',
            subtitle: 'Meet the people behind our success',
            content: 'Our diverse team of professionals brings together expertise from various fields.',
            image: null,
            meta: 'Team profiles updated quarterly',
            members: [],
            debugInfo,
            error: error?.message || 'Unknown error occurred'
        };
    }
}

function ContentSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titlePlaceholder}></div>
                <div className={styles.subtitlePlaceholder}></div>
            </div>
            <div className={styles.heroImagePlaceholder}></div>
            <div className={styles.contentPlaceholder}></div>
            <div className={styles.membersGrid}>
                {[1, 2, 3].map((i) => (
                    <div key={i} className={styles.memberCardSkeleton}>
                        <div className={styles.memberImagePlaceholder}></div>
                        <div className={styles.memberNamePlaceholder}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function TeamContent() {
    const content = await getContent();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{content.title}</h1>
                {content.subtitle && (
                    <p className={styles.subtitle}>{content.subtitle}</p>
                )}
            </header>

            {content.image && (
                <div className={styles.heroImage}>
                    <TeamImage
                        src={content.image}
                        alt={content.title}
                        title={content.title}
                    />
                </div>
            )}

            <article className={styles.content}>
                {content.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className={styles.paragraph}>
                        {paragraph}
                    </p>
                ))}
            </article>

            {content.members && content.members.length > 0 && (
                <div className={styles.teamMembers}>
                    <h2 className={styles.membersTitle}>Our Team</h2>
                    <div className={styles.membersGrid}>
                        {content.members.map((member, index) => (
                            <div key={index} className={styles.memberCard}>
                                {member.image && (
                                    <TeamImage
                                        src={member.image}
                                        alt={member.name}
                                        width={300}
                                        height={300}
                                        className={styles.memberImage}
                                    />
                                )}
                                <h3 className={styles.memberName}>{member.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {content.meta && (
                <footer className={styles.meta}>
                    {content.meta}
                </footer>
            )}
        </div>
    );
}

export default function TeamPage() {
    return (
        <Suspense fallback={<ContentSkeleton />}>
            <TeamContent />
        </Suspense>
    );
}

export async function generateMetadata() {
    try {
        const content = await getContent();
        return {
            title: content.title,
            description: content.subtitle || content.content?.substring(0, 160),
            openGraph: {
                title: content.title,
                description: content.subtitle || content.content?.substring(0, 160),
                images: content.image ? [{ url: content.image }] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Our Team',
            description: 'Meet the people behind our success',
        };
    }
}
