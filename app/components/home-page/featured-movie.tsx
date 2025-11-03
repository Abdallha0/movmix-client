import { Plus } from "lucide-react";
import PlayFill from "../icons/play-fill";
import styles from "./css/featured.module.css"
function Featured({ title, activeTab, overview, img }: { activeTab: "info" | "trailer" | "reviews"; img:string; title: string, overview: string }) {
    return (
        <div className={styles.featured} style={{backgroundImage: `url(${img})`}}>
            <div className={styles.featured_content}>
                <h2 className={styles.featured_title}>{title}</h2>
                <p className={styles.featured_description}>{overview}</p>
                <div className={styles.featured_tabs}>
                    <button className={`${styles.featured_tab} ${activeTab === "info" ? styles.active : ""}`}>Informations</button>
                    <button className={`${styles.featured_tab} ${activeTab === "trailer" ? styles.active : ""}`}>Trailer</button>
                    <button className={`${styles.featured_tab} ${activeTab === "reviews" ? styles.active : ""}`}>Reviews</button>
                </div>
                <div className="hero-buttons">
                    <button className="btn btn-primary"><PlayFill size={20} color="white" /> Watch</button>
                    <button className="btn btn-secondary"><Plus /> MY LIST</button>
                </div>
            </div>
        </div>
    )
}

export default Featured
