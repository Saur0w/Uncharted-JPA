import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function MSMEPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>MSME Compliance Services</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    Unlock the full potential of MSME benefits while ensuring seamless regulatory compliance. As the backbone of India&#39;s economy, Micro, Small, and Medium Enterprises deserve specialized attention to navigate complex regulatory requirements. Our comprehensive MSME Compliance Services simplify the compliance journey, maximize available benefits, and ensure your business remains eligible for government schemes, credit facilities, and policy advantages designed to fuel MSME growth.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li><strong>Udyam Registration & Management:</strong> Complete registration process, updates, and renewal services for optimal MSME status</li>
                                <li><strong>Periodic Return Filing:</strong> Timely preparation and submission of MSME Form 1 and other mandatory returns</li>
                                <li><strong>Scheme Optimization:</strong> Identification and application for relevant government schemes, subsidies, and benefits</li>
                                <li><strong>Credit Facilitation:</strong> Support for priority sector lending, collateral-free loans, and credit guarantee schemes</li>
                                <li><strong>Delayed Payment Recovery:</strong> Assistance with delayed payment claims and MSMED Act provisions</li>
                                <li><strong>Compliance Calendar:</strong> Personalized compliance tracking and deadline management systems</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                            <Text>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our MSME-focused team understands the unique challenges faced by small and medium enterprises. We&#39;ve successfully handled thousands of Udyam registrations, compliance filings, and benefit applications across manufacturing, trading, and service sectors. Our expertise includes navigating complex classification criteria, optimizing investment and turnover calculations, and ensuring businesses remain within beneficial MSME thresholds while maximizing growth opportunities and regulatory advantages.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.methodology}>
                            <Text>
                                <h2>Our Methodology</h2>
                                <p>
                                    Our streamlined approach begins with assessing your current MSME status and identifying optimization opportunities. We ensure accurate classification, complete documentation, and strategic positioning for maximum benefits. Our process includes regular compliance monitoring, proactive scheme identification, and continuous support for maintaining MSME advantages. We provide dedicated relationship management, ensuring you never miss deadlines or opportunities for growth-enabling benefits and schemes.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.whyUs}>
                            <Text>
                                <h2>Why Choose Us</h2>
                                <p>
                                    We specialize in making MSME compliance effortless while maximizing your business advantages. Our dedicated MSME team provides personalized service, affordable solutions, and expert guidance tailored to small business needs. We don&#39;t just handle compliance—we actively help you leverage MSME status for business growth. With our support, you gain access to exclusive benefits, priority banking services, and government schemes while maintaining stress-free compliance that lets you focus on what you do best.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.contact}>
                            <Text>
                                <h2>Get Started</h2>
                                <p>
                                    Ready to unlock the full potential of MSME benefits? <a href="/contact" className={styles.ctaLink}>Connect with our MSME specialists</a> today and transform compliance into a competitive advantage for your business growth.
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}