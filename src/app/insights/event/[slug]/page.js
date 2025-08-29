import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './style.module.scss';
import EventImage from '../eventImage';
import Rounded from '@/common/RoundedButton/index';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchEvent(slug) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/events`, { cache: 'no-store' });

        if (!res.ok) {
            console.error('Failed to fetch events:', res.statusText);
            return null;
        }

        const data = await res.json();
        const events = data.events || [];
        const event = events.find(e => e.slug === slug);

        return event || null;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

export default async function EventPage({ params }) {
    const { slug } = params;
    const event = await fetchEvent(slug);

    if (!event) {
        notFound();
    }

    return (
        <article className={styles.eventPost}>
            <div className={styles.container}>

                <Link href="/insights/event" passHref>
                    <Rounded>
                        <p>← Back to Events</p>
                    </Rounded>
                </Link>

                <header className={styles.eventHeader}>
                    <h1 className={styles.title}>{event.title}</h1>

                    {event.subtitle && (
                        <p className={styles.subtitle}>{event.subtitle}</p>
                    )}

                    <div className={styles.eventMeta}>
                        {event.eventDate && (
                            <span className={styles.eventDate}>
                                📅 {new Date(event.eventDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                            </span>
                        )}
                        {event.location && (
                            <span className={styles.location}>📍 {event.location}</span>
                        )}
                        {event.organizer && (
                            <span className={styles.organizer}>By {event.organizer}</span>
                        )}
                    </div>

                    {event.price && (
                        <div className={styles.price}>
                            <span className={styles.priceTag}>
                                {event.price === 'free' ? 'Free Event' : `₹${event.price}`}
                            </span>
                        </div>
                    )}

                    {event.categories && event.categories.length > 0 && (
                        <div className={styles.categories}>
                            {event.categories.map(category => (
                                <span key={category} className={styles.category}>{category}</span>
                            ))}
                        </div>
                    )}
                </header>

                {event.image && (
                    <div className={styles.featuredImage}>
                        <EventImage
                            src={event.image}
                            alt={event.title}
                            width={800}
                            height={400}
                            className={styles.eventImg}
                        />
                    </div>
                )}

                <div className={styles.eventContent}>
                    <div
                        dangerouslySetInnerHTML={{ __html: event.content }}
                        className={styles.content}
                    />
                </div>
            </div>
        </article>
    );
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const event = await fetchEvent(slug);

    if (!event) {
        return {
            title: 'Event Not Found',
        };
    }

    return {
        title: event.title,
        description: event.subtitle || event.content?.substring(0, 160),
        openGraph: {
            title: event.title,
            description: event.subtitle,
            images: event.image ? [event.image] : [],
        },
    };
}
