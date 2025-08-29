import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function InternalAuditPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>Internal Audit Services</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    Transform your internal audit from a compliance requirement into a strategic business tool. Our Internal Audit Services go beyond traditional checking and verification to provide comprehensive risk assessment, process optimization, and governance enhancement. We help organizations build robust internal control systems, identify operational efficiencies, and strengthen overall business resilience through systematic, risk-based audit approaches tailored to your industry and business model.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li><strong>Risk-Based Audit Approach:</strong> Comprehensive risk assessment and audit planning aligned with business objectives</li>
                                <li><strong>Process Optimization:</strong> Identification of operational inefficiencies and recommendation of improvement strategies</li>
                                <li><strong>Internal Control Evaluation:</strong> Assessment and strengthening of internal control systems and governance frameworks</li>
                                <li><strong>Compliance Assurance:</strong> Regular monitoring of statutory and regulatory compliance across all business functions</li>
                                <li><strong>Fraud Risk Management:</strong> Proactive fraud detection systems and preventive control mechanisms</li>
                                <li><strong>Technology Audit:</strong> IT system audits, cybersecurity assessments, and digital control evaluations</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                            <Text>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our internal audit team comprises certified internal auditors, chartered accountants, IT specialists, and industry experts with extensive experience across manufacturing, services, financial institutions, and non-profit organizations. We combine technical audit expertise with deep business acumen to deliver insights that drive operational excellence. Our team&#39;s diverse background ensures comprehensive audit coverage, from financial controls to operational processes, compliance frameworks to technology systems.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.methodology}>
                            <Text>
                                <h2>Our Methodology</h2>
                                <p>
                                    Our structured methodology begins with understanding your business environment, risk profile, and strategic objectives. We develop customized audit programs using risk-based sampling, advanced data analytics, and process mapping techniques. Our approach includes continuous monitoring systems, stakeholder interviews, control testing, and comprehensive documentation. We deliver actionable insights through detailed reports, executive dashboards, and implementation roadmaps, ensuring sustainable improvements and measurable outcomes.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.whyUs}>
                            <Text>
                                <h2>Why Choose Us</h2>
                                <p>
                                    We&#39;re strategic business partners, not just auditors. Our value-driven approach focuses on enhancing business performance while ensuring regulatory compliance. We provide real-time insights, practical recommendations, and hands-on implementation support. Our audits don&#39;t just identify problems—they deliver solutions that strengthen your organization&#39;s resilience, improve operational efficiency, and create sustainable competitive advantages. With us, internal audit becomes a catalyst for business transformation.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.contact}>
                            <Text>
                                <h2>Get Started</h2>
                                <p>
                                    Ready to transform your internal audit into a strategic advantage? <a href="/contact" className={styles.ctaLink}>Partner with our audit experts</a> today and discover how comprehensive internal audit can drive your business forward.
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}