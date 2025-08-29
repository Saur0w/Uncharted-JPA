"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function InsightClient() {
    return (
        <section className={styles.insightsPage}>
            <div className={styles.hero}>
                <h1>Insights & Resources</h1>
                <p>Explore our latest content and updates</p>
            </div>

            <div className={styles.gridContainer}>
                <Link href="/insights/blog" className={styles.card}>
                    <div className={styles.cardContent}>
                        <h2>Blog</h2>
                        <p>Thought leadership and industry analysis</p>
                        <span className={styles.cta}>View Posts →</span>
                    </div>
                </Link>

                <Link href="/insights/event" className={styles.card}>
                    <div className={styles.cardContent}>
                        <h2>Events</h2>
                        <p>Our latest conferences and workshops</p>
                        <span className={styles.cta}>See Events →</span>
                    </div>
                </Link>

                <Link href="/insights/news" className={styles.card}>
                    <div className={styles.cardContent}>
                        <h2>News</h2>
                        <p>Company announcements and updates</p>
                        <span className={styles.cta}>Read News →</span>
                    </div>
                </Link>
            </div>
        </section>
    );
}