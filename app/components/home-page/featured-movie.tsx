"use client";
import { Plus } from "lucide-react";
import PlayFill from "../icons/play-fill";
import styles from "./css/featured.module.css"
import { useToast } from "@/app/providers/toastProvider";
import { getMoviesReviews, getMovieTrailer } from "@/app/api/movies/movies-api-utils";
import { useState, Dispatch, SetStateAction } from "react";
import Reviews from "./reviews";
import Link from "next/link";

function Featured({ vedio, id, title, overview, img, setVedio }: { vedio: { call: boolean, title: string, url: string }, id: string | number, setVedio: Dispatch<SetStateAction<{ call: boolean; title: string; url: string }>>, img: string; title: string, overview: string }) {
    const { showToast } = useToast();
    const [reviews, setReviews] = useState<any>({ call: false, data: [] });
    const [activeTab, setActiveTab] = useState<"info" | "trailer" | "reviews">("info")

    async function getTrailer() {

        if (vedio.call || vedio.url) {
            console.log("vedio is here")
            return;
        }

        const res = await getMovieTrailer(id, 2);
        if (!res?.status) {
            showToast(res?.message as string, "error");
            return;
        }

        setVedio({
            call: res?.status as boolean,
            title: res.data?.title as string,
            url: res.data?.url as string,
        });
        setActiveTab("trailer")

    }

    async function getReviews() {
        if (reviews.length <= 0 || reviews.call) {
            setActiveTab("reviews")
            return;
        }

        const res = await getMoviesReviews(id, 1);
        if (!res?.status) {
            showToast(res?.message as string, "error");
            return;
        }

        setReviews({ call: true, data: res?.data || [] });
        setActiveTab("reviews")
    }

    function getInfo() {
        setActiveTab("info");
        setReviews((prev: any) => ({ call: false, ...prev }))
    }

    return (
        <div>
            <div className={styles.featured} style={{ backgroundImage: `url(${img})` }}>
                <div className={styles.featured_content}>
                    <h2 className={styles.featured_title}>{title}</h2>
                    <p className={styles.featured_description}>{overview}</p>
                    <div className={styles.featured_tabs}>
                        <button className={`${styles.featured_tab} ${activeTab === "info" ? styles.active : ""}`} onClick={getInfo} >Informations</button>
                        <button className={`${styles.featured_tab} ${activeTab === "trailer" ? styles.active : ""}`} onClick={getTrailer}>Trailer</button>
                        <button className={`${styles.featured_tab} ${activeTab === "reviews" ? styles.active : ""}`} onClick={getReviews}>Reviews</button>
                    </div>
                    <div className="hero-buttons">
                        <Link href={`/stream/${id}/${title}`}>
                            <button className="btn btn-primary"><PlayFill size={20} color="white" /> Watch</button>
                        </Link>
                        <button className="btn btn-secondary"><Plus /> MY LIST</button>
                    </div>
                </div>
            </div>
            {(reviews.call && activeTab === "reviews") && <Reviews reviews={reviews.data} />}
        </div>
    )
}

export default Featured
