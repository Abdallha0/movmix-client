"use client"
import { House, ListVideo, Settings, UserRound } from "lucide-react"
import Link from "next/link"
import styles from "./css/sidebar.module.css"
import { getUserName } from "@/app/utils/cookieUtils";
import { useSession } from "next-auth/react";
import { useSessionStatus } from "@/app/hooks/session-status"

function Sidebar({ active }: { active?: "home" | "play list" | "account" | "setting" }) {
    const { data } = useSession();
    const status = useSessionStatus().sessionStatus
    let name = status === "authenticated" ? data?.user?.name as string || getUserName() as string || "unknown" : "GUEST";

    return (
        <div className={styles.sidebar} >
            <Link href="/home" className={`${styles.sidebar_icon} ${active === "home" ? styles.active : ""}`} title="home"><House /></Link>
            <Link href={name !== "GUEST" ? `/${name.split(" ").join("-")}/watchlist` : "/login"} className={`${styles.sidebar_icon} ${active === "play list" ? styles.active : ""}`} title="play list" ><ListVideo /></Link>
            <Link href={name !== "GUEST" ? `/${name.split(" ").join("-")}/profile` : "/login"} className={`${styles.sidebar_icon} ${active === "account" ? styles.active : ""}`} title="account"><UserRound /></Link>
            <Link href="/settings" className={`${styles.sidebar_icon} ${active === "setting" ? styles.active : ""}`} title="settings"><Settings /></Link>
        </div>
    )
}

export default Sidebar
