"use client";

import { SignIn } from "@clerk/nextjs";
import styles from "./style.module.scss";

export default function SignInPage() {
    return (
        <>
            <div className={styles.logIn}>
                <SignIn routing="hash" />
            </div>
        </>
    );
}
