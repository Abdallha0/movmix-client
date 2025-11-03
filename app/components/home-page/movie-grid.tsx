"use client"
import { useEffect, useState } from "react";
import MovieCard from "../cards/movie-card";
import { trending } from "@/app/api/movies/tmdb";

function MovieGrid() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        async function fetchData() {
            const res = await trending("week", 2, 1);
            if (!res.status) {
                setIsLoading(false);
                setErrorMsg(res?.message);
                return;
            }

            setData(res?.movies);
                            setIsLoading(false);
        }
        fetchData();
    }, [])

    if(isLoading) return <div className="loader"></div>

    return (
        <div className="movie-grid">
            {
                data.length >= 1 ?
                    data.map((item, i) => (
                        <MovieCard img={item.poster} key={i || item.id} ratting={item.ratting} title={item.title} year={item.year} />
                    )) : <div className="not-found"> movies not defind </div>
            }
        </div>
    )
}

export default MovieGrid
