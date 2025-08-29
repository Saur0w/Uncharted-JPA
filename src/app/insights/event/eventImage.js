"use client";

import { CldImage } from "next-cloudinary";
import styles from './style.module.scss';

export default function EventsImage({ src, alt, title }) {
    if (!src) return null;

    return (
        <div className={styles.heroImage}>
            <CldImage
                src={src}
                alt={alt || 'Events hero image'}
                width={1200}
                height={600}
                crop="fit"
                gravity="auto"
                quality="auto"
                format="auto"
                sizes="(max-width: 768px) 100vw, 1200px"
                className={styles.heroImg}
                priority={true}
                loading="eager"
                onError={(e) => {
                    console.error('Events image failed to load:', src);
                    e.currentTarget.parentElement.style.display = 'none';
                }}
            />
        </div>
    );
}