import { Search } from "lucide-react";
import styles from "./css/header.module.css"
export function Header() {
    return (
        <header className={styles.watchlist_header}>
            <div className={styles.header_content}>
                <div className={styles.search_container}>
                    <Search className={styles.search_icon} size={18} />
                    <input type="text" className={styles.search_input} placeholder="Search your watchlist..." />
                </div>
            </div>
        </header>
    )
}