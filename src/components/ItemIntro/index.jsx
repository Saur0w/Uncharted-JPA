"use client";

import styles from "./style.module.scss";
import Text from "@/common/Text/index";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

export default function ItemIntro() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;

        gsap.fromTo(
            textRef.current,
            {
                y: isMobile ? 150 : 250,     // More conservative values
                scale: 0.7,                  // Less extreme scale
                opacity: 0.3,               // Start with some opacity
            },
            {
                y: 0,
                scale: 1,                   // Normal final scale
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",       // Start later
                    end: "center 60%",      // End earlier
                    scrub: 1,               // Faster scrub
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section className={styles.itemIntro} ref={sectionRef}>
            <div className={styles.itemIntroText} ref={textRef}>
                <Text>
                    <h1>Beyond Numbers, Towards Success</h1>
                </Text>
            </div>
        </section>
    );
}
