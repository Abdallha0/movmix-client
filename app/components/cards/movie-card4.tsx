import StarFill from "../icons/star-fill"
import styles from "./css/movie-card4.module.css"

interface Data { id: number | string, title: string, poster: string, year: number, rating: number }
function MovieCard4({ movie }: { movie: Data }) {
    return (
        <div className={styles.movieCard}>
            <img
                src={movie.poster}
                className={styles.moviePoster}
            />
            <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.movieYear}>{movie.year}</p>
                <div className={styles.movieRating}>
                    <span><StarFill color="gold" /></span>
                    <span>{movie.rating}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard4