import Link from 'next/link';
import styles from './style.module.scss';
import BlogImage from './blogImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchBlogPosts() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });

        if (!res.ok) {
            console.error('Failed to fetch blog posts:', res.statusText);
            return [];
        }

        const data = await res.json();
        return data.posts || [];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await fetchBlogPosts();

    return (
        <section className={styles.blogPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Blog Posts</h1>
                    <p>Latest insights and updates from our team</p>
                </header>

                {posts.length === 0 ? (
                    <div className={styles.noPosts}>
                        <p>No blog posts found. Check back soon for new content!</p>
                    </div>
                ) : (
                    <div className={styles.postsGrid}>
                        {posts.map(post => (
                            <Link
                                key={post.id || post.slug}
                                href={`/insights/blog/${post.slug}`}
                                className={styles.postCardLink}
                            >
                                <article className={styles.postCard}>
                                    {post.image && (
                                        <div className={styles.postImage}>
                                            <BlogImage
                                                src={post.image}
                                                alt={post.title}
                                                width={400}
                                                height={250}
                                                className={styles.cardImg}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.postContent}>
                                        <h2 className={styles.postTitle}>
                                            {post.title}
                                        </h2>

                                        {post.subtitle && (
                                            <p className={styles.postSubtitle}>{post.subtitle}</p>
                                        )}

                                        <div className={styles.postMeta}>
                                            {post.author && (
                                                <span className={styles.author}>By {post.author}</span>
                                            )}
                                            <time dateTime={post.publishedAt} className={styles.date}>
                                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className={styles.tags}>
                                                {post.tags.map(tag => (
                                                    <span key={tag} className={styles.tag}>{tag}</span>
                                                ))}
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
