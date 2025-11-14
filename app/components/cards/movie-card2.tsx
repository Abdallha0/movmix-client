"use client"
import { useState, useEffect } from "react"
import styles from "./css/movie-card2.module.css"

function MovieCard2({ title, ratting, ratingSource, country, runTime, year, img, id, overview }: { ratingSource: string, country: string, runTime: string, id: string | number, title: string, ratting: number | string, year: number, img: string, overview: string }) {
    const [color, setColor] = useState("#ffcc00");
    const [rate, setRate] = useState(`0.${ratting.toString().split(".").join("")}`)
    useEffect(() => {
        if (ratingSource === "Internet Movie Database") {
            setRate(`0.${ratting.toString().split(".").join("")}`);
            setColor("#ffcc00");
        } else if (ratingSource === "Rotten Tomatoes") {
            setRate(`0.${ratting.toString().split("%")[0]}`);
            setColor("#ff0000");
        } else if (ratingSource === "Metacritic") {
            setRate(`0.${ratting.toString().split("/")[0]}`);
            setColor("#093b6c");
        } else {
            setRate("0");
            setColor("#999");
        }
    }, [ratting, ratingSource]); 
    return (
        <div className={styles.card}>
            <img src={img} alt={title} />
            <div className={styles.bottom_section}>
                <span className={styles.title}>{title}</span>
                <p className={styles.overview}>{overview}</p>
                <div className={`${styles.row} ${styles.row1}`}>
                    <div className={styles.item}>
                        <span className={styles.big_text}>{year}</span>
                        <span className={styles.regular_text}>Year</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.big_text}>{runTime}</span>
                        <span className={styles.regular_text}>Run time</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.big_text}>{country}</span>
                        <span className={styles.regular_text}>Country</span>
                    </div>
                </div>
            </div>
            <div className={styles.rating_contaienr} title={ratingSource}>
                <div className={styles.rating_wrapper}>
                    <svg className={styles.progress_ring} width="50" height="50">
                        <circle className={styles.progress_ring__bg} cx="25" cy="25" r="20" />
                        <circle className={styles.progress_ring__progress} style={{ stroke: color, strokeDashoffset: `calc(125.6 - (125.6 * ${rate}))` }} cx="25" cy="25" r="20" />
                    </svg>
                    <span className={styles.rating_text}>{ratting}</span>
                </div>


            </div>
        </div>
    )
}

export default MovieCard2
