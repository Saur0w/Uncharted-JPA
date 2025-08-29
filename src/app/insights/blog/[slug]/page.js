import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './style.module.scss';
import BlogImage from '../blogImage';
import Rounded from '@/common/RoundedButton/index';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchBlogPost(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });

        if (!res.ok) {
            console.error('Failed to fetch blog posts:', res.statusText);
            return null;
        }

        const data = await res.json();
        const posts = data.posts || [];
        const post = posts.find(p => p.slug === slug);

        return post || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = params;
    const post = await fetchBlogPost(slug);

    if (!post) {
        notFound();
    }


    return (
        <article className={styles.blogPost}>
            <div className={styles.container}>

                <Link href="/insights/blog" passHref >
                    <Rounded>
                        <p>← Back to Blog</p>
                    </Rounded>
                </Link>


                <header className={styles.postHeader}>
                    <h1 className={styles.title}>{post.title}</h1>

                    {post.subtitle && (
                        <p className={styles.subtitle}>{post.subtitle}</p>
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
                </header>

                {post.image && (
                    <div className={styles.featuredImage}>
                        <BlogImage
                            src={post.image}
                            alt={post.title}
                            width={800}
                            height={400}
                            className={styles.postImg}
                        />
                    </div>
                )}

                <div className={styles.postContent}>
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        className={styles.content}
                    />
                </div>
            </div>
        </article>
    );
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const post = await fetchBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.subtitle || post.content?.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.subtitle,
            images: post.image ? [post.image] : [],
        },
    };
}
