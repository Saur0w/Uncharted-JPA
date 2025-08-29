"use client";

import { CldImage } from "next-cloudinary";
import styles from './style.module.scss';

export default function TeamImage({ src, alt, title, width = 800, height = 500, className = '', ...props }) {
    if (!src) return null;

    return (
        <div className={`${styles.imageContainer} ${className}`}>
            <CldImage
                src={src}
                alt={alt || 'Team image'}
                width={width}
                height={height}
                crop="fit"
                gravity="auto"
                quality="auto"
                format="auto"
                sizes="(max-width: 768px) 100vw, 800px"
                className={styles.image}
                priority={true}
                loading="eager"
                onError={(e) => {
                    console.error('Image failed to load:', src);
                    e.currentTarget.parentElement.style.display = 'none';
                }}
                {...props}
            />
        </div>
    );
}