"use client";

import { SignOutButton } from '@clerk/nextjs';
import styles from "./signOut.module.scss";

export default function Header() {
    return (
        <div className={styles.signOut}>
            <SignOutButton>
                <button>End session</button>
            </SignOutButton>
        </div>
    );
}
