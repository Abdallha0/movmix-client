import { Calendar, Play, Plus, Star, X } from "lucide-react";
import styles from "./css/movie-card2.module.css"
import Link from "next/link";
interface DataTypes {
    id: string | number;
    title: string;
    poster: string;
    rating: number;
    year: number;
    progress: number;
    genres: Array<string>;
    Mstatus: string;
    removeMovie: (id: string | number) => void;
}
function MovieCard2({ id, title, poster, rating, year, progress, genres, Mstatus, removeMovie }: DataTypes) {
    return (
        <article className={styles.movie_card}>
            <div className={styles.movie_poster_container}>
                <img src={poster || "/placeholder.svg"} alt={title} className={styles.movie_poster} />

                {/* Badges */}
                <div className={styles.card_badges}>
                    <div className={styles.rating_badge}>
                        <Star size={14} fill="currentColor" />
                        {rating}
                    </div>
                    <span className={`${styles.status_badge} ${status}`}>
                        {status === "plan_to_watch" ? "Plan" : status}
                    </span>
                </div>

                {/* Quick Remove */}
                <button className={styles.quick_remove} onClick={() => removeMovie(id)} aria-label="Remove from watchlist">
                    <X size={16} />
                </button>

                {/* Hover Overlay */}
                <div className={styles.poster_overlay}>
                    <div className={styles.overlay_actions}>
                        <Link href={`/stream/${id}/${title.split(" ").join("-")}`}>
                            <button className={`${styles.action_btn} ${styles.primary}`}>
                                <Play size={16} fill="currentColor" />
                                
                            </button></Link>

                    </div>
                </div>
            </div>

            <div className={styles.movie_info}>
                <h3 className={styles.movie_title}>{title}</h3>
                <div className={styles.movie_meta}>
                    <span>
                        <Calendar size={12} />
                        {year}
                    </span>
                </div>
                <div className={styles.movie_genres}>

                    <span className={styles.genre_tag}>
                        {genres}
                    </span>

                </div>

                {/* Progress for watching movies */}
                {Mstatus === "watching" && (
                    <div className={styles.progress_container}>
                        <div className={styles.progress_label}>
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className={styles.progress_bar}>
                            <div className={styles.progress_fill} style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}
            </div>
        </article >
    )
}

export default MovieCard2
