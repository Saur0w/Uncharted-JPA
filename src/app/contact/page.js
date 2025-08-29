"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response:", data);
            setSubmitStatus("Message sent successfully!");

            setFormData({
                name: "",
                email: "",
                service: "",
                message: "",
            });
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    const formVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    const detailsVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }
        }
    };

    return (
        <motion.div
            className={styles.contactContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <motion.div className={styles.headerSection} variants={itemVariants}>
                <motion.h1 className={styles.heading}>
                    Get in Touch with us
                </motion.h1>
                <motion.p className={styles.subheading}>
                    Ready to transform your financial future? Let&apos;s start the conversation.
                </motion.p>
            </motion.div>

            <div className={styles.contactContent}>
                <motion.div
                    className={styles.formContainer}
                    variants={formVariants}
                >
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <motion.div className={styles.formGroup} variants={itemVariants}>
                            <label htmlFor="name">What&apos;s your name?</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                autoComplete="name"
                            />
                            <div className={styles.inputLine}></div>
                        </motion.div>

                        <motion.div className={styles.formGroup} variants={itemVariants}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                            />
                            <div className={styles.inputLine}></div>
                        </motion.div>

                        <motion.div className={styles.formGroup} variants={itemVariants}>
                            <label htmlFor="service">Service you&apos;re looking for</label>
                            <input
                                id="service"
                                type="text"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                placeholder="e.g., Tax consultation, Audit services"
                                required
                            />
                            <div className={styles.inputLine}></div>
                        </motion.div>

                        <motion.div className={styles.formGroup} variants={itemVariants}>
                            <label htmlFor="message">Tell us more</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Share details about your requirements..."
                                rows="4"
                                required
                            ></textarea>
                            <div className={styles.inputLine}></div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                        >
                            <span>
                                {isSubmitting ? (
                                    <>
                                        <div className={styles.loadingSpinner}></div>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </span>
                            {!isSubmitting && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </motion.button>

                        {submitStatus && (
                            <motion.div
                                className={`${styles.statusMessage} ${submitStatus.includes("Failed") ? styles.errorMessage : styles.successMessage}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                {submitStatus.includes("Failed") ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                                {submitStatus}
                            </motion.div>
                        )}
                    </form>
                </motion.div>

                <motion.div
                    className={styles.contactDetails}
                    variants={detailsVariants}
                >
                    <motion.h3 className={styles.detailsTitle} variants={itemVariants}>
                        Contact Information
                    </motion.h3>

                    <div className={styles.detailsList}>
                        <motion.div className={styles.detailItem} variants={itemVariants}>
                            <div className={styles.detailIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Company</span>
                                <p>JPA <span>Charted Accountants</span></p>
                            </div>
                        </motion.div>

                        <motion.div className={styles.detailItem} variants={itemVariants}>
                            <div className={styles.detailIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Email</span>
                                <p>
                                    <a href="mailto:accounts@joshipayalandassociates.com">accounts@joshipayalandassociates.com</a>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div className={styles.detailItem} variants={itemVariants}>
                            <div className={styles.detailIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.271 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59544 1.99522 8.06544 2.16708 8.43027 2.48353C8.79511 2.79999 9.02801 3.23945 9.08999 3.72C9.20618 4.68007 9.42956 5.62273 9.75999 6.53C9.90999 6.88792 9.9424 7.27691 9.85653 7.65088C9.77066 8.02485 9.57225 8.36811 9.28999 8.64L7.85999 10.07C9.26123 12.5769 11.423 14.7387 13.93 16.14L15.36 14.71C15.6319 14.4278 15.9751 14.2293 16.3491 14.1435C16.7231 14.0576 17.1121 14.09 17.47 14.24C18.3773 14.5705 19.3199 14.7938 20.28 14.91C20.7658 14.9723 21.2094 15.2101 21.5265 15.5792C21.8437 15.9484 22.0122 16.4234 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Phone</span>
                                <p>
                                    <a href="tel:+918171000000">+91 1247964478</a>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div className={styles.detailItem} variants={itemVariants}>
                            <div className={styles.detailIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Location</span>
                                <p>Gurgaon, Haryana: India</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div className={styles.socialSection} variants={itemVariants}>
                        <h4>Connect with us</h4>
                        <div className={styles.socialLinks}>
                            <motion.a
                                href="https://www.linkedin.com/in/payal-joshi-62a537221"
                                className={styles.socialIcon}
                                aria-label="LinkedIn"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}