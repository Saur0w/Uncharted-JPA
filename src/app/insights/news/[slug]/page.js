import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './style.module.scss';
import NewsImage from '../newsImage';
import Rounded from '@/common/RoundedButton/index';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchNewsArticle(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/news`, { cache: 'no-store' });

        if (!res.ok) {
            console.error('Failed to fetch news articles:', res.statusText);
            return null;
        }

        const data = await res.json();
        const articles = data.articles || [];
        const article = articles.find(a => a.slug === slug);

        return article || null;
    } catch (error) {
        console.error('Error fetching news article:', error);
        return null;
    }
}

export default async function NewsArticlePage({ params }) {
    const { slug } = params;
    const article = await fetchNewsArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className={styles.newsPost}>
            <div className={styles.container}>

                <Link href="/insights/news" passHref>
                    <Rounded>
                        <p>← Back to News</p>
                    </Rounded>
                </Link>

                <header className={styles.newsHeader}>
                    <h1 className={styles.title}>{article.title}</h1>

                    {article.subtitle && (
                        <p className={styles.subtitle}>{article.subtitle}</p>
                    )}

                    <div className={styles.newsMeta}>
                        {article.source && (
                            <span className={styles.source}>Source: {article.source}</span>
                        )}
                        <time dateTime={article.publishedAt} className={styles.date}>
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>

                    {article.categories && article.categories.length > 0 && (
                        <div className={styles.categories}>
                            {article.categories.map(category => (
                                <span key={category} className={styles.category}>{category}</span>
                            ))}
                        </div>
                    )}

                    {article.urgent && (
                        <div className={styles.breakingNews}>
                            🚨 Breaking News
                        </div>
                    )}
                </header>

                {article.image && (
                    <div className={styles.featuredImage}>
                        <NewsImage
                            src={article.image}
                            alt={article.title}
                            width={800}
                            height={400}
                            className={styles.newsImg}
                        />
                    </div>
                )}

                <div className={styles.newsContent}>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className={styles.content}
                    />
                </div>

                {article.location && (
                    <div className={styles.locationInfo}>
                        <h3>Location</h3>
                        <p>📍 {article.location}</p>
                    </div>
                )}

                {article.relatedLinks && article.relatedLinks.length > 0 && (
                    <div className={styles.relatedLinks}>
                        <h3>Related Links</h3>
                        <ul>
                            {article.relatedLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </article>
    );
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const article = await fetchNewsArticle(slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: article.title,
        description: article.subtitle || article.content?.substring(0, 160),
        openGraph: {
            title: article.title,
            description: article.subtitle,
            images: article.image ? [article.image] : [],
            type: 'article',
        },
        other: {
            'article:published_time': article.publishedAt,
            'article:section': article.categories?.[0] || 'News',
            'article:author': article.source,
        },
    };
}
