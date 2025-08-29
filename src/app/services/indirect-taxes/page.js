import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function TaxPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>Indirect Tax Services</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    Navigate the complex landscape of indirect taxation with confidence. Our comprehensive Indirect Tax Services encompass GST compliance, input tax credit optimization, and strategic tax planning to ensure your business remains compliant while maximizing available benefits. From registration to returns, audits to appeals, we provide end-to-end solutions tailored to your industry needs.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li><strong>GST Registration & Returns:</strong> Seamless registration process and timely filing of GSTR-1, GSTR-3B, and annual returns</li>
                                <li><strong>Input Tax Credit Optimization:</strong> Maximize ITC claims through systematic reconciliation and compliance strategies</li>
                                <li><strong>GST Audit & Compliance:</strong> Comprehensive audit support and representation before tax authorities</li>
                                <li><strong>Indirect Tax Planning:</strong> Strategic advisory to minimize tax liability and ensure compliance across transactions</li>
                                <li><strong>Custom Duty Consultancy:</strong> Expert guidance on import/export procedures, duty optimization, and customs compliance</li>
                                <li><strong>Multi-state GST Management:</strong> Simplified compliance for businesses operating across multiple states</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                            <Text>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our specialized team comprises seasoned tax professionals, former revenue officials, and industry experts with deep understanding of GST laws, customs regulations, and indirect tax provisions. We&#39;ve successfully handled complex cases across manufacturing, trading, services, and e-commerce sectors, ensuring businesses stay ahead of regulatory changes while optimizing their tax positions. Our expertise spans from startup registrations to large corporate restructuring scenarios.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.methodology}>
                            <Text>
                                <h2>Our Methodology</h2>
                                <p>
                                    We begin with a comprehensive assessment of your current indirect tax position, identifying compliance gaps and optimization opportunities. Our structured approach includes setting up robust GST systems, implementing automated reconciliation processes, and establishing regular monitoring mechanisms. We provide monthly compliance calendars, quarterly reviews, and proactive alerts for regulatory changes, ensuring your business never misses critical deadlines or opportunities.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.whyUs}>
                            <Text>
                                <h2>Why Choose Us</h2>
                                <p>
                                    Beyond routine compliance, we serve as your strategic indirect tax partners. Our technology-driven approach combines deep technical expertise with practical business understanding. We don&#39;t just file returns—we optimize your entire indirect tax ecosystem. With real-time support, dedicated relationship managers, and a track record of successful audit defenses, we ensure your business thrives in the complex indirect tax environment while maintaining complete peace of mind.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.contact}>
                            <Text>
                                <h2>Get Started</h2>
                                <p>
                                    Ready to transform your indirect tax compliance from a burden into a competitive advantage? <a href="/contact" className={styles.ctaLink}>Connect with our experts today</a> for a comprehensive consultation and discover how we can optimize your indirect tax strategy.
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}