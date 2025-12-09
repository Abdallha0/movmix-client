import { Search } from "lucide-react";
import styles from "./css/header.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
export function Header() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    async function handleSubmite(e: any) {
        e.preventDefault();
        if (!query) return;

        router.push(`/search?q=${query.split(" ").join("-")}`)
    }

    return (
        <header className={styles.watchlist_header}>
            <div className={styles.header_content}>
                <form onSubmit={handleSubmite} className={styles.search_container}>
                    <Search className={styles.search_icon} size={18} />
                    <input onChange={(e) => setQuery(e.target.value)} type="text" className={styles.search_input} placeholder="Search movies..." />
                </form>
            </div>
        </header>
    )
}