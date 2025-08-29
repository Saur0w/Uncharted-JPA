import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function StatutoryAuditPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>Statutory Audit Services</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    Ensure regulatory compliance and financial transparency with our comprehensive Statutory Audit Services. As independent chartered accountants, we provide thorough examination of your financial statements, ensuring adherence to accounting standards, legal requirements, and regulatory frameworks. Our statutory audits deliver credible, unbiased opinions on the true and fair view of your financial position, helping stakeholders make informed decisions while maintaining investor confidence and regulatory compliance.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li><strong>Independent Financial Assessment:</strong> Unbiased examination of financial statements ensuring accuracy and completeness</li>
                                <li><strong>Regulatory Compliance:</strong> Comprehensive compliance with Companies Act, Income Tax Act, and applicable accounting standards</li>
                                <li><strong>Stakeholder Assurance:</strong> Enhanced credibility with investors, lenders, and regulatory authorities through independent audit opinions</li>
                                <li><strong>Risk Identification:</strong> Early detection of financial irregularities, material misstatements, and compliance gaps</li>
                                <li><strong>Corporate Governance:</strong> Strengthening board oversight and transparency in financial reporting processes</li>
                                <li><strong>Timely Reporting:</strong> Efficient audit completion within statutory deadlines with comprehensive audit reports</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our statutory audit team consists of qualified chartered accountants with extensive experience across diverse industries including manufacturing, retail, services, pharmaceuticals, and technology sectors. We stay current with evolving accounting standards, regulatory changes, and industry-specific compliance requirements. Our expertise encompasses Indian GAAP, Ind AS, tax regulations, and sector-specific guidelines, ensuring thorough and compliant audit execution that meets all statutory obligations.
                                </p>
                        </div>

                        <div className={styles.methodology}>
                                <h2>Our Methodology</h2>
                                <p>
                                    Our systematic approach begins with comprehensive planning, risk assessment, and understanding of your business operations and internal controls. We employ advanced audit techniques including analytical procedures, substantive testing, and detailed transaction verification. Our methodology includes thorough documentation, management letter preparation, and clear communication of findings. We ensure complete compliance with auditing standards while delivering practical insights for financial reporting improvements and internal control enhancements.
                                </p>
                        </div>

                        <div className={styles.whyUs}>
                                <h2>Why Choose Us</h2>
                                <p>
                                    We combine technical excellence with practical business understanding to deliver statutory audits that go beyond compliance. Our independent, objective approach ensures regulatory adherence while providing valuable insights for business improvement. We maintain the highest professional standards, complete audits within deadlines, and provide clear communication throughout the process. Our audit opinions carry credibility with stakeholders, regulatory authorities, and financial institutions, supporting your business growth and compliance objectives.
                                </p>
                        </div>

                        <div className={styles.contact}>
                                <h2>Get Started</h2>
                                <p>
                                    Ensure your statutory compliance with confidence and professionalism. <a href="/contact" className={styles.ctaLink}>Connect with our audit experts</a> today for reliable, independent statutory audit services that meet all regulatory requirements.
                                </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
