"use client";

import styles from './style.module.scss';
import Text from '@/common/Text/index';

export default function ItemOutro() {
    return (
      <>
          <section className={styles.itemOutro}>
              <div className={styles.mainLine}>
                  <Text>
                      <h1>Let’s talk about your growth...</h1>
                  </Text>
              </div>
          </section>
      </>
    );
}