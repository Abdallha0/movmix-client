"use client"
import { useEffect, useState } from "react";
import MovieCard from "../cards/movie-card";
import styles from "./css/slideSection.module.css";

function SlideSection({ data }: { data: Array<object> }) {

    return (
        <section className={styles.sec1}>
            <div className={styles.movie_row}>
                <div className={styles.scroll_container}>
                    {
                        data.length >= 1 ?
                            data.map((item: any, i) => (
                                <MovieCard id={item?.tmdb} title={item?.title} img={item?.poster} ratting={item?.ratting} year={item?.year} key={item?.tmdb || i} />
                            )) : <div className="not-found"> can not found any movies at here </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default SlideSection
