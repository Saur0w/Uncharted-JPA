"use client";

import styles from "./style.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function WorkItem() {
    const workItemMainRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger, SplitText);

    useGSAP(() => {
        const workItems = workItemMainRef.current.querySelectorAll(`.${styles.workItem}`);

        workItems.forEach((item) => {
            const img = item.querySelector(`.${styles.workItemImg}`);
            const nameH1 = item.querySelector(`.${styles.workItemName} h1`);

            if (nameH1) {
                const split = new SplitText(nameH1, {
                    type: "chars",
                    charsClass: "char"
                });

                gsap.set(split.chars, { y: "125%" });
                split.chars.forEach((char, index) => {
                    ScrollTrigger.create({
                        trigger: item,
                        start: `top+=${index * 25 - 250} top`,
                        end: `top+=${index * 25 - 100} top`,
                        scrub: 1,
                        animation: gsap.fromTo(char, {
                            y: "125%"
                        }, {
                            y: "0%",
                            ease: "none"
                        })
                    });
                });
            }

            if (img) {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top bottom",
                    end: "top top",
                    scrub: 0.5,
                    animation: gsap.fromTo(
                        img,
                        {
                            clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)"
                        }, {
                            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            ease: "none"
                        }
                    )
                });

                ScrollTrigger.create({
                    trigger: item,
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: 0.5,
                    animation: gsap.fromTo(
                        img,
                        {
                            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                        }, {
                            clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
                            ease: "none"
                        }
                    )
                })
            }
        });
    }, { scope: workItemMainRef });

    return (
        <>
            <section className={styles.workItemMain} ref={workItemMainRef}>
                <section className={styles.workItem}>
                    <div className={styles.workItemImg}>
                        <Image src="/images/city.jpg" alt="journey" fill priority />
                    </div>
                    <div className={styles.workItemName}>
                        <h1>Building Trust</h1>
                    </div>
                </section>

                <section className={styles.workItem}>
                    <div className={styles.workItemImg}>
                        <Image src="/images/beach.jpg" alt="carbon edge landing" fill priority />
                    </div>
                    <div className={styles.workItemName}>
                        <h1 className={styles.beach}>Lasting Value</h1>
                    </div>
                </section>

                <section className={styles.workItem}>
                    <div className={styles.workItemImg}>
                        <Image src="/images/us.jpg" alt="carbon edge us" fill priority />
                    </div>
                    <div className={styles.workItemName}>
                        <h1>Driving growth</h1>
                    </div>
                </section>

                <section className={styles.workItem}>
                    <div className={styles.workItemImg}>
                        <Image src="/images/bridge.jpg" alt="Bridge" fill priority />
                    </div>
                    <div className={styles.workItemName}>
                        <h1>Guiding Success</h1>
                    </div>
                </section>

                <section className={styles.workItem}>
                    <div className={styles.workItemImg}>
                        <Image src="/images/canvas.jpg" alt="Fort" fill priority />
                    </div>
                    <div className={styles.workItemName}>
                        <h1>Fortifying Compliance</h1>
                    </div>
                </section>
            </section>
        </>
    );
}