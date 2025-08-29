"use client";

import styles from './style.module.scss';
import Text from '@/common/Text/index';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

export default function ItemOutro() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;

        gsap.fromTo(
            textRef.current,
            {
                y: isMobile ? 100 : 150,
                scale: 0.8,
                opacity: 0
            },
            {
                y: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "center center",
                    scrub: 1,
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <>
            <section className={styles.itemOutro} ref={sectionRef}>
                <div className={styles.mainLine} ref={textRef}>
                    <Text>
                        <h1>Let's talk about your growth...</h1>
                    </Text>
                </div>
            </section>
        </>
    );
}
