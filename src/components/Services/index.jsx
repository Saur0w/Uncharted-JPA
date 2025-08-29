"use client";

import styles from './style.module.scss';
import {useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useRouter} from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const router = useRouter();

    const services = [
        {
            id: "indirect-taxes",
            number: "01",
            title: "Indirect Taxes",
            description: "Expert assistance with GST, customs, and other indirect indirect-taxes laws to ensure compliance and reduce indirect-taxes burden.",
        },
        {
            id: "company-law-and-compliances",
            number: "02",
            title: "Company Law and Compliances",
            description: "Comprehensive support for ROC filings, board meeting compliance, and other corporate law requirements.",
        },
        {
            id: "fema",
            number: "03",
            title: "FEMA (Foreign Exchange Management Act)",
            description: "Advisory and compliance services for cross-border transactions, FDI, ODI, and FEMA regulations.",
        },
        {
            id: "msme-compliance",
            number: "04",
            title: "MSME Compliance",
            description: "Specialized services to help micro, small, and medium enterprises stay compliant with regulatory standards.",
        },
        {
            id: "internal-audit",
            number: "05",
            title: "Internal Audit",
            description: "Improve operations and manage risks through regular and systematic internal audits tailored to your business.",
        },
        {
            id: "certifications",
            number: "06",
            title: "Certifications",
            description: "Assistance in obtaining financial, statutory, and regulatory certifications required by various authorities.",
        }
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.from(`.${styles.item}`, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleClick = (id) => {
        router.push(`/services/${id}`);
    };

    return (
        <section className={styles.aboutSection} ref={sectionRef}>
            <div className={styles.body}>
                <h2 ref={headingRef}>We can help you with...</h2>
                <div className={styles.grid}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={styles.item}
                            onClick={() => handleClick(service.id)}
                            style={{cursor: "pointer"}}
                        >
                            <span className={styles.number}>{service.number}</span>
                            <hr/>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}