import Link from 'next/link';
import styles from './style.module.scss';
import NewsImage from './newsImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchNewsArticles() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/news`, { cache: 'no-store' });

        if (!res.ok) {
            console.error('Failed to fetch news articles:', res.statusText);
            return [];
        }

        const data = await res.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news articles:', error);
        return [];
    }
}

export default async function NewsPage() {
    const articles = await fetchNewsArticles();

    return (
        <section className={styles.newsPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Latest News</h1>
                    <p>Stay updated with the latest announcements and industry news</p>
                </header>

                {articles.length === 0 ? (
                    <div className={styles.noNews}>
                        <p>No news articles found. Check back soon for updates!</p>
                    </div>
                ) : (
                    <div className={styles.newsGrid}>
                        {articles.map(article => (
                            <Link
                                key={article.id || article.slug}
                                href={`/insights/news/${article.slug}`}
                                className={styles.newsCardLink}
                            >
                                <article className={styles.newsCard}>
                                    {article.image && (
                                        <div className={styles.newsImage}>
                                            <NewsImage
                                                src={article.image}
                                                alt={article.title}
                                                width={400}
                                                height={250}
                                                className={styles.cardImg}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.newsContent}>
                                        <h2 className={styles.newsTitle}>
                                            {article.title}
                                        </h2>

                                        {article.subtitle && (
                                            <p className={styles.newsSubtitle}>{article.subtitle}</p>
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
                                            <div className={styles.urgentBadge}>
                                                Breaking News
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
