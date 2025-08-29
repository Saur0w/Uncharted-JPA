"use client";

import styles from "./style.module.scss";
import Text from "@/common/Text/index";

export default function Landing() {
    return (
        <section className={styles.landing}>
            <div className={styles.container}>
                <div className={styles.scrollText}>
                    <p>scroll</p>
                </div>
                <div className={styles.mainHeading}>
                    <Text>
                        <h1>
                            We help<br />
                            businesses<br />
                            grow with<br />
                            confidence
                        </h1>
                    </Text>
                </div>
            </div>
        </section>
    );
}