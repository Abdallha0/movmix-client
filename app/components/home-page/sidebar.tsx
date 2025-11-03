"use client"
import { House, ListVideo, Settings, UserRound } from "lucide-react"
import Link from "next/link"
import styles from "./css/sidebar.module.css"

function Sidebar({ name, active }: { name: string, active: "home" | "play list" | "account" | "setting" }) {
    return (
        <div className={styles.sidebar} >
            <Link href="/home" className={`${styles.sidebar_icon} ${active === "home" ? styles.active : ""}`} title="home"><House /></Link>
            <Link href="/play-list" className={`${styles.sidebar_icon} ${active === "play list" ? styles.active : ""}`} title="play list" ><ListVideo /></Link>
            <Link href={`${name.split(" ").join("-")}`} className={`${styles.sidebar_icon} ${active === "account" ? styles.active : ""}`} title="account"><UserRound /></Link>
            <Link href="/settings" className={`${styles.sidebar_icon} ${active === "setting" ? styles.active : ""}`} title="settings"><Settings /></Link>
        </div>
    )
}

export default Sidebar
