"use client"
import { CircleUserRound } from "lucide-react"
import Link from "next/link"
import styles from "./css/header.module.css"

function Header({ name, photo }: { name: string, photo: string }) {
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
            {name !== "GUEST" ? (<div className={styles.user_section}>
                <span>{name}</span>
                <div className={styles.user_avatar}
                    style={photo ? { backgroundImage: `url(${photo})` } : { background: "transparent" }}>
                    {!photo && <CircleUserRound />}
                </div>
            </div>) : (<Link href="/login"> <button className={`${styles.login_btn} click-effect`}>log in</button>
            </Link>)}
        </header>
    )
}

export default Header
