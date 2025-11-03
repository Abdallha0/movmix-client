import StarFill from "../icons/star-fill";
import styles from "./css/movie-card.module.css";
function MovieCard({ isActive, title, ratting, year, img }: { isActive?: boolean, title: string, ratting: number, year: number, img: string, }) {
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
        </div>
    )
}

export default MovieCard
