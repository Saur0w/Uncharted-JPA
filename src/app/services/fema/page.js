
import styles from "../servicesStyle/style.module.scss";
import Text from "@/common/Text/index";

export default function FEMAPage() {
    return (
        <>
            <section className={styles.serviceSection}>
                <div className={styles.body}>
                    <div className={styles.heading}>
                        <Text>
                            <h1>FEMA Advisory & Compliance Services</h1>
                        </Text>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.overview}>
                            <Text>
                                <h2>Overview</h2>
                            </Text>
                            <Text>
                                <p>
                                    The Foreign Exchange Management Act (FEMA), 1999 governs all cross-border transactions involving foreign exchange in India. Whether you&#39;re an Indian business receiving foreign investment, an NRI investing in India, or a company dealing with overseas remittances or ECBs, FEMA compliance is critical to avoid legal issues and regulatory scrutiny. Our FEMA advisory services ensure that your international financial dealings are fully compliant with RBI and FEMA regulations.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.keyFeatures}>
                            <Text>
                                <h2>Key Features & Benefits</h2>
                            </Text>
                            <ul>
                                <li>Advisory on FDI, ODI, ECB, and NRI transactions</li>
                                <li>Assistance with RBI approvals and reporting (FC-GPR, FLA, etc.)</li>
                                <li>End-to-end FEMA compliance and documentation review</li>
                                <li>Support for compounding applications and FEMA audits</li>
                            </ul>
                        </div>

                        <div className={styles.ourExpertise}>
                            <Text>
                                <h2>Our Expertise</h2>
                                <p>
                                    Our team has extensive experience in advising corporates, startups, and NRIs on inbound and outbound investments. We have successfully assisted clients in obtaining RBI approvals, structuring cross-border deals, and filing regulatory returns accurately. With a sharp understanding of FEMA, RBI master directions, and allied laws, we provide strategic, risk-free solutions for all types of foreign exchange transactions.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.methodology}>
                            <Text>
                                <h2>Our Methodology</h2>
                                <p>
                                    We begin by understanding your business objective—be it funding, investment, or remittance. Based on that, we conduct a compliance check, identify reporting requirements, and guide you through documentation, application filing, and post-transaction compliance. We maintain ongoing support and alert you to regulatory changes that may impact your foreign transactions.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.whyUs}>
                            <Text>
                                <h2>Why Choose Us</h2>
                                <p>
                                    FEMA compliance is complex and sensitive. We offer not just technical expertise, but practical, time-sensitive execution. Our proactive approach, direct coordination with legal and financial institutions, and deep subject knowledge make us the go-to advisors for both individuals and corporates navigating FEMA regulations.
                                </p>
                            </Text>
                        </div>

                        <div className={styles.contact}>
                            <Text>
                                <h2>Get Started</h2>
                                <p>
                                    Have questions about cross-border compliance? <a href="/contact" className={styles.ctaLink}>Reach out to us today</a> to ensure your FEMA filings and transactions are fully secure and compliant.
                                </p>
                            </Text>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
