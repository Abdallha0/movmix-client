"use client"
import { mangePlayList } from "@/app/api/movies/server";
import { PlusCircle } from "lucide-react"
import { useToast } from "@/app/providers/toastProvider";
import StarFill from "../icons/star-fill";
import styles from "./css/movie-card.module.css";
import React from "react";

function MovieCard({ title, ratting, year, img, id }: { id: string | number, title: string, ratting: number, year: number, img: string, }) {
    const { showToast } = useToast();
    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation(); // prevent to click on card
        const res = await mangePlayList("set", id, title, img);
        showToast(res.message, res.status ? "success" : "error");
    }
    return (
        <div className={styles.movie_card} style={{ background: `url(${img || ""}) center no-repeat` }}>
            {!img && <div className={styles.card_layout}></div>}
            <div className={styles.movie_info}>
                <div className={styles.movie_title}>{title || ""}</div>
                <div className={styles.movie_meta}>
                    <span><StarFill size={18} color="gold" /> {ratting || ""}</span>
                    <span>{year || ""}</span>
                </div>
            </div>
            <button className={styles.add_to_list_btn} onClick={(e) => handleClick(e)}> <PlusCircle size={20} /> </button>
        </div>
    )
}

export default MovieCard
