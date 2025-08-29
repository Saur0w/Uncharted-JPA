"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import Text from "@/common/Text/index";

export default function AboutPage() {
    const dotsRef = useRef([]);
    const aboutRef = useRef();

    useGSAP(() => {
        gsap.from(dotsRef.current, {
            opacity: 0,
            stagger: 0.3,
            ease: "power4.inOut",
            repeat: -1
        });
    }, { scope: aboutRef });


    return (
        <section className={styles.aboutPage} ref={aboutRef}>
            <div className={styles.body}>
                <div className={styles.heading}>
                    <Text>
                        <h1>
                            Trusted Advisors. Tailored Solutions. Real Results.
                        </h1>
                    </Text>
                </div>

                <div className={styles.contentFirst}>
                    <div className={styles.aboutPara}>
                        
                            <p className={styles.para}>
                                At the heart of our firm is a commitment to understanding your unique business. <br />
                                We go beyond compliance — offering strategic insights, proactive planning, and financial clarity
                                that drives long-term value. <br />Whether you&#39;re scaling a startup or managing a legacy enterprise,
                                we provide personalized solutions that help you navigate change, manage risk, and seize opportunity.
                            </p>
                        
                    </div>

                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/us.jpg"
                            alt="About Us"
                            fill
                            className={styles.aboutImage}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.heading2}>
                    
                        <h2>
                            <span className={styles.dot} ref={el => (dotsRef.current[0] = el)}>.</span>
                            <span className={styles.dot} ref={el => (dotsRef.current[1] = el)}>.</span>
                            <span className={styles.dot} ref={el => (dotsRef.current[2] = el)}>.</span>
                            Because Every Journey Deserves Direction
                        </h2>
                    
                </div>

                <div className={styles.because}>
                    <div className={styles.journeyImageContainer}>
                        <Image
                            src="/images/journey.jpg"
                            alt="Navigation"
                            width={390}
                            height={590}
                        />
                    </div>
                    <div className={styles.text2}>
                        
                            <p>
                                In the ever-changing world of finance, every decision shapes the path ahead. <br />
                                We believe that every journey — whether you&#39;re launching a new venture, expanding your
                                operations, or planning for the future — deserves experienced guidance. <br />
                                Our role is to help you chart a clear course, avoid unnecessary detours, and arrive at your
                                goals with confidence and clarity.
                            </p>
                        
                    </div>
                </div>

                <div className={styles.teamCard}>
                    <Link href="/about/team">
                        <div className={styles.cardContent}>
                            <h2>Meet Our Experts</h2>
                            <p>Click to explore our team of qualified professionals</p>
                            <div className={styles.arrowIcon}>
                                <span>→</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
