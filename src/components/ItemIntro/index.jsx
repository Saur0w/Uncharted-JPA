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
        gsap.fromTo(
            textRef.current,
            {
                y: 200,
                scale: 0.6,
                opacity: 0.2
            },
            {
                y: 0,        // ends at normal spot
                scale: 1.2,  // ends a bit bigger (adjust to taste)
                opacity: 1,  // fully visible
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",   // starts as soon as section hits viewport bottom
                    end: "top top",        // ends when section top reaches top of viewport
                    scrub: 2,              // slow lag for ultra smoothness
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
