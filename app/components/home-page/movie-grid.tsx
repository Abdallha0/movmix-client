"use client"
import { useEffect, useState } from "react";
import MovieCard from "../cards/movie-card";
import { newMovies, popular, topMovies, trending } from "@/app/api/movies/tmdb";
import { useToast } from "@/app/providers/toastProvider";

function MovieGrid({ activeItem, activeGerne }: { activeItem: "Trending" | "Popular" | "Recently added" | "Top Movies", activeGerne: "Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy" }) {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const { showToast } = useToast()
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setErrorMsg("");
            let res;

            switch (activeItem) {
                case "Trending":
                    res = await trending("week", 1, 1, false, activeGerne);
                    break;
                case "Popular":
                    res = await popular(2, false, 1, 2025, activeGerne, false);
                    break;
                case "Recently added":
                    res = await newMovies(1, false, 1, 2025, activeGerne, false);
                    break;
                case "Top Movies":
                    res = await topMovies(2, false, 1, null, activeGerne, false);
                    break;
                default:
                    res = await trending("week", 1, 1, false, activeGerne );
                    break;
            }

            if (!res?.status) {
                setIsLoading(false);
                setErrorMsg(res?.message);
                showToast(res?.message)
                return;
            }

            setData(res?.movies || []);
            setIsLoading(false);
        }
        fetchData();
    }, [activeItem, activeGerne])

    if (isLoading) return <div className="loader"></div>

    return (
        <div className="movie-grid">
            {
                data.length >= 1 ?
                    data.map((item, i) => (
                        <MovieCard img={item.poster} key={item.id || i} ratting={item.ratting} title={item.title} year={item.year} />
                    )) : <div className="not-found">No movies found for this category.</div>
            }
        </div>
    )
}

export default MovieGrid
