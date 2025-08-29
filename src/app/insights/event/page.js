import Link from 'next/link';
import styles from './style.module.scss';
import EventImage from './eventImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchEvents() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/events`, { cache: 'no-store' });

        if (!res.ok) {
            console.error('Failed to fetch events:', res.statusText);
            return [];
        }

        const data = await res.json();
        return data.events || [];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export default async function EventPage() {
    const events = await fetchEvents();

    return (
        <section className={styles.eventPage}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Upcoming Events</h1>
                    <p>Join us for exciting events and networking opportunities</p>
                </header>

                {events.length === 0 ? (
                    <div className={styles.noEvents}>
                        <p>No events scheduled at the moment. Check back soon for updates!</p>
                    </div>
                ) : (
                    <div className={styles.eventsGrid}>
                        {events.map(event => (
                            <Link
                                key={event.id || event.slug}
                                href={`/insights/event/${event.slug}`}
                                className={styles.eventCardLink}
                            >
                                <article className={styles.eventCard}>
                                    {event.image && (
                                        <div className={styles.eventImage}>
                                            <EventImage
                                                src={event.image}
                                                alt={event.title}
                                                width={400}
                                                height={250}
                                                className={styles.cardImg}
                                            />
                                        </div>
                                    )}

                                    <div className={styles.eventContent}>
                                        <h2 className={styles.eventTitle}>
                                            {event.title}
                                        </h2>

                                        {event.subtitle && (
                                            <p className={styles.eventSubtitle}>{event.subtitle}</p>
                                        )}

                                        <div className={styles.eventMeta}>
                                            <div className={styles.dateLocation}>
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
                                            </div>
                                            {event.organizer && (
                                                <span className={styles.organizer}>By {event.organizer}</span>
                                            )}
                                        </div>

                                        {event.price && (
                                            <div className={styles.price}>
                                                <span className={styles.priceTag}>
                                                    {event.price === 'free' ? 'Free' : `₹${event.price}`}
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

                                        {event.registrationRequired && (
                                            <div className={styles.registrationBadge}>
                                                Registration Required
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
