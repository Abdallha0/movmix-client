"use client"
import MovieCard4 from "../cards/movie-card4";
import styles from "./css/likedMovies.module.css";
import Link from "next/link";

interface Data { id: number | string, title: string, poster: string, year: number, rating: number}
export function LikedMovies({ data }: { data: Array<Data> }) {
    return (
        <section className={styles.moviesSection}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Favorite Movies</h2>
                <Link href="#" className={styles.viewAll}>
                    View All →
                </Link>
            </div>

            <div className={styles.moviesGrid}>
                {data.length >= 1 ?
                    (data.map((movie: Data, index: number) => (
                        <Link href={`/stream/${movie.id}/${movie.title}`} key={movie.id || index}>
                            <MovieCard4 movie={movie} key={movie.id || index} />
                        </Link>
                    ))) : (
                        <h2 className="error-msg">You did`t liked any movies</h2>
                    )}
            </div>
        </section>
    )
}
