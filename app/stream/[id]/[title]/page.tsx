"use client";
import { MovieHero } from "@/app/components/stream-page/movie-hero";
import { MovieDetails } from "@/app/components/stream-page/movie-details";
import { CastSection } from "@/app/components/stream-page/cast-section";
import { ReviewsSection } from "@/app/components/stream-page/reviews-section";
import { SimilarMovies } from "@/app/components/stream-page/similar-movies";
import { useEffect, useState } from "react";
import { getStreamData } from "@/app/api/movies/server";
import { useParams } from "next/navigation";
import { useToast } from "@/app/providers/toastProvider";
import styles from "./page.module.css";
import Sidebar from "@/app/components/home-page/sidebar";
import Vedio from "@/app/components/vedio";

function Page() {
    const params = useParams();
    const id = params.id as string | number
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState<any>({});
    const [userData, setUserData] = useState<any>({});
    const { showToast } = useToast();
    const [showVedio, setShowVedio] = useState({ call: false })

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            showToast("wrong please try again or choose diffrent movie", "error");
            return;
        };

        async function fetchData() {
            const res = await getStreamData(id);
            if (!res.status) {
                setIsLoading(false);
                setError(res.message);
                return;
            }

            if (!res.data) {
                setError("No Data Found")
                setIsLoading(false)
            }

            setData(res.data);
            setUserData(res.user)
            setIsLoading(false)
        }

        fetchData();
    }, [id])

    if (isLoading) return <div className="loader"></div>
    if (error) return <div className="layout center-page">
        <h2>{error}</h2>
    </div>

    return (
        <main className={styles.main}>
            <MovieHero id={data.tmdb || data.imdb} poster={data.poster} liked={userData.liked} setShowVedio={setShowVedio} backdrop={data.backdrop} year={data.year} runtime={data.runtime} genres={data.genre} metascore={data.metascoreRating} overview={data.overview} rated={data.rated} rating={data.imdbRating} title={data.title} />
            <div className={styles.content}>
                <MovieDetails
                    id={data.tmdb}
                    awards={data.awards}
                    budget={data.budget}
                    director={data.director}
                    language={data.language}
                    plot={data.plot}
                    poster={data.poster}
                    ratings={data.ratings}
                    released={data.released}
                    runtime={data.runtime}
                    writers={data.writer}
                    boxOffice={data.boxOffice}
                    actors={data.actors}
                    country={data.country}
                    productionCompanies={data.productionCompanies}
                    revenue={data.revenue}
                    votes={data.votes}
                />
                <CastSection casts={data.casts} />
                <ReviewsSection id={data.tmdb} />
                <SimilarMovies id={data.tmdb} genre={data.genre[0]} />
            </div>
            <Sidebar />
            {showVedio.call && <Vedio url={data.vedio} title={data.title} setVedio={setShowVedio} />}
        </main>
    )
}

export default Page
