"use client"
import Link from "next/link"
import styles from "./css/navbar.module.css"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSessionStatus } from "@/app/hooks/session-status";

function Navbar({ active }: { active: "home" | "movies" | "account" | "about" }) {
    useEffect(() => { AOS.init({ duration: 800, once: true }) }, []);
    const status = useSessionStatus();

    return (
        <header className={styles.navbar} data-aos="fade-down">
            <div className={styles.logo_container}>
                <img src="../../favicon.ico" alt="" />
                <h1 className="logo">Movmix</h1>
            </div>
            <nav className={styles.nav_links}>
                <ul>
                    <li className={active === "home" ? styles.active : ""}>
                        <Link href="/home">home</Link>
                    </li>
                    <li className={active === "movies" ? styles.active : ""}>
                        <Link href="/movies">movies</Link>
                    </li>
                    <li className={active === "account" ? styles.active : ""}>
                        <Link href={status === "unauthenticated" ? "/login" : `/user/account`}>account</Link>
                    </li>
                    <li className={active === "about" ? styles.active : ""}>
                        <Link href="/about">about</Link>
                    </li>
                </ul>
            </nav>
            {status === "unauthenticated" &&
                <div className={styles.btn_container}>
                    <button className="click-effect">login</button>
                </div>
            }
        </header>
    )
}

export default Navbar