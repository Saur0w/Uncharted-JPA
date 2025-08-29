import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function CompanyLawPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>Company Law and Compliance&#39;s</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    Company law compliance forms the bedrock of corporate governance and business sustainability. Our comprehensive Company Law and Compliances services ensure your organization meets all statutory requirements under the Companies Act, 2013, and MCA regulations. From incorporation to complex restructuring, board governance to annual filings, we provide end-to-end legal compliance solutions that protect your business interests while maintaining regulatory excellence.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li><strong>Company Incorporation & Structuring:</strong> Complete incorporation services, name reservation, and optimal business structure design</li>
                                <li><strong>Annual Compliance Management:</strong> ROC filings, annual returns, board meeting compliance, and statutory registers maintenance</li>
                                <li><strong>Corporate Governance Advisory:</strong> Board constitution, director appointments, KMP compliance, and governance best practices</li>
                                <li><strong>Secretarial Compliance:</strong> Meeting minutes, resolutions drafting, notices preparation, and statutory documentation</li>
                                <li><strong>Regulatory Liaison:</strong> MCA correspondence, scrutiny handling, and regulatory consultation</li>
                                <li><strong>Corporate Restructuring:</strong> Mergers, acquisitions, share transfers, and capital restructuring support</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                            <Text>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our team of qualified Company Secretaries, corporate lawyers, and compliance specialists brings decades of combined experience in corporate law and governance. We&#39;ve successfully guided startups through their incorporation journey, helped SMEs navigate complex compliance requirements, and assisted listed companies with sophisticated governance challenges. Our expertise spans across all company types—private limited, public limited, OPCs, and LLPs—ensuring tailored solutions for every business structure.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.methodology}>
                            <Text>
                                <h2>Our Methodology</h2>
                                <p>
                                    We commence with a comprehensive compliance health check, identifying current status and potential risk areas. Our structured approach includes creating customized compliance calendars, implementing digital documentation systems, and establishing regular monitoring protocols. We provide quarterly compliance reviews, proactive regulatory updates, and hands-on support for all filings and documentation. Our digital-first methodology ensures audit-ready documentation and seamless compliance tracking.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.whyUs}>
                            <Text>
                                <h2>Why Choose Us</h2>
                                <p>
                                    We transform compliance from a regulatory burden into a strategic advantage. Our proactive approach anticipates regulatory changes, prevents compliance gaps, and ensures your company maintains an impeccable legal standing. With dedicated compliance managers, real-time support, and a proven track record of zero penalty assessments, we provide peace of mind that allows you to focus on core business growth while we handle the complex world of corporate compliance.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.contact}>
                            <Text>
                                <h2>Get Started</h2>
                                <p>
                                    Ready to ensure bulletproof corporate compliance? <a href="/contact" className={styles.ctaLink}>Connect with our Company Law experts</a> today for a comprehensive compliance assessment and strategic roadmap.
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}