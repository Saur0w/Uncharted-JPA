"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

export default function Header() {
    const dropdownItems = {
        services: [
            {path: "/services/indirect-taxes", label: "Indirect Taxes"},
            {path: "/services/company-law-and-compliances", label: "Company Law and Compliances"},
            {path: "/services/fema", label: "FEMA (Foreign Exchange Management Act)"},
            {path: "/services/msme-compliance", label: "MSME Compliance"},
            {path: "/services/internal-audit", label: "Internal Audit"},
            {path: "/services/certifications", label: "Certifications"},
        ],
        about: [{path: "/about/team", label: "Our Team"}],
        insights: [
            {path: "/insights/blog", label: "Blog"},
            {path: "/insights/news", label: "News"},
            {path: "/insights/event", label: "Events"},
        ],
    };

    const container = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const tl = useRef(null);
    const headColour = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveDropdown(null);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    useGSAP(
        () => {
            const Colors = [
                "#222326",
                "#23272E",
                "#2B2F3A",
                "#191919",
                "#253040",
                "#232930",
                "#282828",
                "#1D2747",
                "#321A28",
                "#1C2421",
                "#3A2C40",
                "#1B3A45",
                "#222029",
            ];

            function animateColor() {
                const color =
                    Colors[
                        Math.floor(Math.random() * Colors.length)
                        ];
                gsap.to(headColour.current, {
                    duration: 8,
                    color: color,
                    ease: "power2.inOut",
                    onComplete: animateColor,
                });
            }

            animateColor();

            gsap.set(".menuLinkItemHolder", {
                y: 75,
                opacity: 0,
            });

            gsap.set(".dropdownItemHolder", {
                y: 30,
                opacity: 0,
            });

            // Create timeline
            tl.current = gsap
                .timeline({paused: true})
                .to(".menuOverlay", {
                    duration: 1.25,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut",
                })
                .to(".menuLinkItemHolder", {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                    delay: -0.75,
                });
        },
        {scope: container}
    );

    // Handle menu open/close
    useEffect(() => {
        if (tl.current) {
            if (isMenuOpen) {
                tl.current.play();
                document.body.style.overflow = "hidden";
            } else {
                tl.current.reverse();
                document.body.style.overflow = "auto";
            }
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (activeDropdown) {
            const dropdownElements = document.querySelectorAll(
                `.dropdown-${activeDropdown} .dropdownItemHolder`
            );
            if (dropdownElements.length > 0) {
                gsap.fromTo(
                    dropdownElements,
                    {y: 30, opacity: 0},
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power3.out",
                    }
                );
            }
        }
    }, [activeDropdown]);

    return (
        <div className={styles.headerContainer} ref={container}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.brand}>
                        <div className={styles.logoText}>
                            <h1>
                <span className={styles.headText} ref={headColour}>
                  Joshi Payal
                </span>{" "}
                                <br/>
                                <span className={styles.amp}>&</span>
                                <span className={styles.otherOne}>Associates</span>
                            </h1>
                            <span className={styles.ca}>Chartered Accountants</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={styles.desktopNav}>
                        <div className={styles.dropdown}>
                            <div className={styles.navItem}>
                                <Link href="/services">Services</Link>
                                <svg
                                    className={styles.chevron}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                >
                                    <path
                                        d="M2 4l4 4 4-4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <div className={styles.dropdownMenu}>
                                {dropdownItems.services.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className={styles.dropdown}>
                            <div className={styles.navItem}>
                                <Link href="/about">About Us</Link>
                                <svg
                                    className={styles.chevron}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                >
                                    <path
                                        d="M2 4l4 4 4-4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <div className={styles.dropdownMenu}>
                                {dropdownItems.about.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className={styles.dropdown}>
                            <div className={styles.navItem}>
                                <Link href="/insights">Insights</Link>
                                <svg
                                    className={styles.chevron}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                >
                                    <path
                                        d="M2 4l4 4 4-4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <div className={styles.dropdownMenu}>
                                {dropdownItems.insights.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/contact" className={styles.navItem}>
                            Contact
                        </Link>
                    </nav>

                    <div className={styles.mobileMenuBtn} onClick={toggleMenu}>
                        <span>{isMenuOpen ? "Close" : "Menu"}</span>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.menuOverlay} menuOverlay`}>
                <div className={styles.menuOverlayBar}>
                    <div className={styles.menuClose} onClick={toggleMenu}>
                        <span>&#x2715;</span>
                    </div>
                </div>

                <div className={styles.menuContent}>
                    <div className={styles.menuLinks}>
                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link href="/" className={styles.menuLink} onClick={closeMenu}>
                                    Home
                                </Link>
                            </div>
                        </div>

                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link
                                    href="/services"
                                    className={styles.menuLink}
                                    onClick={closeMenu}
                                >
                                    Services
                                </Link>
                            </div>
                        </div>

                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link
                                    href="/about"
                                    className={styles.menuLink}
                                    onClick={closeMenu}
                                >
                                    About Us
                                </Link>
                            </div>
                        </div>

                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link
                                    href="/insights"
                                    className={styles.menuLink}
                                    onClick={closeMenu}
                                >
                                    Insights
                                </Link>
                            </div>
                        </div>

                        <div className={styles.menuLinkItem}>
                            <div className="menuLinkItemHolder">
                                <Link
                                    href="/contact"
                                    className={styles.menuLink}
                                    onClick={closeMenu}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.menuFooter}>
                    <p>Chartered Accountants</p>
                </div>
            </div>
        </div>
    );
}
