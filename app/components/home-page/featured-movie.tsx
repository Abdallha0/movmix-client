"use client"
import { Plus } from "lucide-react";
import PlayFill from "../icons/play-fill";
import styles from "./css/featured.module.css"
import { useToast } from "@/app/providers/toastProvider";
import { getMovieTrailer } from "@/app/api/movies/movies-api-utils";
function Featured({ id, title, activeTab, overview, img, setVedio }: { id: string | number, setVedio: (p: { call: boolean, title: string, url: string }) => void, activeTab: "info" | "trailer" | "reviews"; img: string; title: string, overview: string }) {
    const { showToast } = useToast()
    async function getTrailer() {
        setVedio({
            call: false,
            title: "",
            url: ""
        })
        const res = await getMovieTrailer(id, 2);
        if (!res?.status) {
            showToast(res?.message as string, "error");
            return;
        }

        setVedio({
            call: res?.status as boolean,
            title: res.data?.title as string,
            url: res.data?.url as string,
        })

    }


    return (
        <div className={styles.featured} style={{ backgroundImage: `url(${img})` }}>
            <div className={styles.featured_content}>
                <h2 className={styles.featured_title}>{title}</h2>
                <p className={styles.featured_description}>{overview}</p>
                <div className={styles.featured_tabs}>
                    <button className={`${styles.featured_tab} ${activeTab === "info" ? styles.active : ""}`}>Informations</button>
                    <button className={`${styles.featured_tab} ${activeTab === "trailer" ? styles.active : ""}`} onClick={getTrailer}>Trailer</button>
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
