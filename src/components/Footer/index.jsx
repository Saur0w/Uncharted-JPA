"use client";

import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import Link from "next/link";

export default function Footer() {
    const arrowRef = useRef(null);

    useEffect(() => {
        // Simple animation without GSAP - can be replaced with GSAP later
        const arrow = arrowRef.current;
        if (arrow) {
            const handleMouseEnter = () => {
                arrow.style.transform = 'translateX(8px) scale(1.1)';
            };

            const handleMouseLeave = () => {
                arrow.style.transform = 'translateX(0) scale(1)';
            };

            arrow.addEventListener('mouseenter', handleMouseEnter);
            arrow.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                arrow.removeEventListener('mouseenter', handleMouseEnter);
                arrow.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.heading}>
                <h1>Let's Build Your Financial Future Together</h1>
                <Link href="/contact">
                    <div className={styles.arrowContainer} ref={arrowRef}>
                        <svg
                            fill="none"
                            stroke="currentColor"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="1.5"
                            className={styles.arrow}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                        <div className={styles.arrowBg}></div>
                    </div>
                </Link>
            </div>

            <div className={styles.footerDetails}>
                <div className={styles.column}>
                    <h4>Connect</h4>
                    <a
                        href="https://www.linkedin.com/in/payal-joshi-62a537221"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit our LinkedIn profile"
                    >
                        LinkedIn
                    </a>
                </div>

                <div className={styles.column}>
                    <h4>Location</h4>
                    <address>
                        <p>Gurgaon, Haryana</p>
                        <p>India</p>
                    </address>
                </div>

                <div className={styles.column}>
                    <h4>Contact</h4>
                    <a
                        href="mailto:accounts@joshipayalandassociates.com"
                        aria-label="Send us an email"
                    >
                        accounts@joshipayalandassociates.com
                    </a>
                    <a
                        href="tel:+911247964478"
                        aria-label="Call us"
                    >
                        +91 1247964478
                    </a>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>
                    © {new Date().getFullYear()} Joshi Payal & Associates. All rights reserved.
                </p>
            </div>
        </footer>
    );
}