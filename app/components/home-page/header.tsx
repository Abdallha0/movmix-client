"use client"
import { CircleUserRound } from "lucide-react"
import Link from "next/link"
import styles from "./css/header.module.css"

function Header({ name, photo }: { name: string, photo: string | null | undefined | "" }) {
    return (
        <header className={styles.header} data-aos="fade-down">
            <nav className={styles.nav}>
                <div className="logo">Movmix</div>
                <ul className={styles.nav_links}>
                    <li className={styles.nav_link}><Link href={`${location.pathname}/new`}>New</Link></li>
                    <li className={styles.nav_link}><Link href={`${location.pathname}/movies`}>Movies</Link></li>
                    <li className={styles.nav_link}><Link href={`${location.pathname}/series`}>Series</Link></li>
                    <li className={styles.nav_link}><Link href={`${location.pathname}/cartoons`}>Cartoons</Link></li>
                </ul>
            </nav>
            <div className={styles.user_section}>
                <span>{name}</span>
                <div className={styles.user_avatar}
                    style={photo ? { background: `url(${photo}) center` } : { background: "transparent" }}>
                    {!photo && <CircleUserRound />}
                </div>
            </div>
        </header>
    )
}

export default Header
