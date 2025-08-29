"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import Link from "next/link"; // 🔹 import Link from next
import Rounded from "@/common/RoundedButton";
import Text from "@/common/Text";

export default function Services() {
    const services = [
        {
            title: "Indirect Taxes",
            category: "Tax",
            description: "GST registration, return filing, compliance, and advisory services for indirect taxation.",
            id: "indirect-taxes"
        },
        {
            title: "Company Law and Compliances",
            category: "Compliance",
            description: "Corporate governance, statutory compliances, and company law advisory services.",
            id: "company-law-and-compliances"
        },
        {
            title: "FEMA (Foreign Exchange Management Act)",
            category: "Regulatory",
            description: "Foreign exchange compliance, FEMA advisory, and cross-border transaction guidance.",
            id: "fema"
        },
        {
            title: "MSME Compliance",
            category: "Compliance",
            description: "Micro, Small & Medium Enterprises registration, compliance, and regulatory support.",
            id: "msme-compliance"
        },
        {
            title: "Internal Audit",
            category: "Audit",
            description: "Comprehensive internal audit services, risk assessment, and process improvement.",
            id: "internal-audit"
        },
        {
            title: "Certifications",
            category: "Advisory",
            description: "Professional certifications, attestations, and various statutory certificates.",
            id: "certifications"
        }
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredServices =
        selectedCategory === "All"
            ? services
            : services.filter((s) => s.category === selectedCategory);

    const categories = ["All", "Tax", "Compliance", "Audit", "Regulatory", "Advisory"];

    return (
        <div className={styles.services}>
            <div className={styles.body}>
                <Text>
                    <h1 className={styles.heading}>What We Do</h1>
                </Text>

                <div className={styles.filters}>
                    {categories.map((cat, index) => (
                        <Rounded key={index} onClick={() => setSelectedCategory(cat)}>
                            <p className={selectedCategory === cat ? styles.active : ""}>{cat}</p>
                        </Rounded>
                    ))}
                </div>

                <div className={styles.serviceList}>
                    {filteredServices.map((service, index) => (
                        <Link key={index} href={`/services/${service.id}`} passHref>
                            <div className={styles.serviceItem}>
                                <div className={styles.serviceTitle}>{service.title}</div>
                                <div className={styles.serviceDescription}>{service.description}</div>
                                <div className={styles.serviceMeta}>{service.category}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
