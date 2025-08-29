"use client";

import styles from './style.module.scss';
import Text from '@/common/Text';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.body}>
                <div className={styles.content}>
                    <div
                        className={styles.text}
                    >
                        <Text>
                            <p className={styles.para1}>
                                Empowering businesses with
                                clarity, compliance, and
                                confidence.
                            </p>

                            <p className={styles.para2}>
                                Precision in numbers, vision in growth.
                            </p>
                        </Text>
                    </div>

                    <div
                        className={styles.imageWrapper}
                    >
                        <Image
                            src="/images/graph.jpg"
                            alt="Data graph showing growth"
                            width={500}
                            height={500}
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
