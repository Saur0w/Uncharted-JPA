
"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const element = magnetic.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });

        const yTo = gsap.quickTo(element, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return <div ref={magnetic} style={{ display: "inline-block" }}>{children}</div>;
}
