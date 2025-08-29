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
                y: isMobile ? 300 : 500,      // Much further below
                scale: 0.2,                   // Much smaller starting size
                opacity: 0,                   // Completely invisible
                transformOrigin: "center center"
            },
            {
                y: 0,                         // Normal position
                scale: isMobile ? 1 : 1.1,    // Final size (slightly bigger on desktop)
                opacity: 1,                   // Fully visible
                ease: "power2.out",           // Smoother ease
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",         // Start earlier for more dramatic effect
                    end: "center center",     // End when section center hits viewport center
                    scrub: 1.5,              // Smoother scrub
                    // markers: true,         // Uncomment for debugging
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
