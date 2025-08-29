import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function CertificationPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>Certifications and Attestations</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    Professional certifications and attestations serve as critical enablers for business growth, regulatory compliance, and stakeholder confidence. Whether you need financial certificates for loan applications, compliance attestations for regulatory submissions, or specialized certificates for tenders and business opportunities, our certification services provide the credibility and documentation required to advance your business objectives with speed, accuracy, and complete regulatory compliance.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li><strong>Financial Certificates:</strong> Net worth certificates, turnover certificates, and financial position attestations for banking and funding requirements</li>
                                <li><strong>Compliance Attestations:</strong> Statutory compliance certificates, tax compliance attestations, and regulatory submission support</li>
                                <li><strong>Specialized Certifications:</strong> Project certificates, startup valuations, and sector-specific attestations for various business needs</li>
                                <li><strong>Rapid Turnaround:</strong> Express certification services for urgent business requirements and time-sensitive applications</li>
                                <li><strong>Audit-Ready Documentation:</strong> Comprehensive supporting documentation and working papers for complete traceability</li>
                                <li><strong>Multi-Purpose Acceptance:</strong> Certifications accepted by banks, government bodies, investors, and international institutions</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                            <Text>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our certification team comprises qualified Chartered Accountants, financial analysts, and compliance experts with extensive experience across industries and certification types. We&#39;ve issued thousands of certificates for diverse purposes including loan applications, foreign remittances, government tenders, startup funding, merger transactions, and regulatory submissions. Our expertise ensures every certificate meets the highest professional standards and specific requirements of the intended recipient institution.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.methodology}>
                            <Text>
                                <h2>Our Methodology</h2>
                                <p>
                                    Our systematic approach begins with understanding the specific certification requirements and intended use. We conduct thorough document verification, financial analysis, and compliance assessment based on the certificate type. Our process includes detailed working paper preparation, multiple quality checks, and format alignment with recipient requirements. We maintain comprehensive audit trails and supporting documentation, ensuring complete transparency and professional integrity in every certification issued.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.whyUs}>
                            <Text>
                                <h2>Why Choose Us</h2>
                                <p>
                                    We combine professional excellence with practical business understanding. Our certifications carry the credibility of experienced professionals and the reliability of systematic processes. We understand the urgency of business opportunities and provide flexible, fast-track services without compromising accuracy. Our track record includes zero rejections from financial institutions and regulatory bodies, ensuring your certifications open doors rather than create delays in your business journey.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.contact}>
                            <Text>
                                <h2>Get Started</h2>
                                <p>
                                    Need professional certifications that open business opportunities? <a href="/contact" className={styles.ctaLink}>Connect with our certification experts</a> today for fast, reliable, and professionally sound attestation services.
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}