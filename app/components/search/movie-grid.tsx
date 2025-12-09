import { MovieCard3 } from "../cards/movie-card3"
import styles from "./css/movie-grid.module.css"

interface MovieGridProps {
  searchQuery: string,
  movies: [{
    id: number | string
    title: string
    year: number
    rating: number
    genre: string
    poster: string
  genres: Array<string>

  }]
}


export function MovieGrid({ searchQuery, movies }: MovieGridProps) {
  return (
    <>
      <div className={styles.results_header}>
        <span className={styles.results_count}>
          Showing <strong>{movies.length}</strong> results for "<strong>{searchQuery}</strong>"
        </span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.view_options}>
            <button data-aos="zoom-in" className={`${styles.view_button} ${styles.active}`} aria-label="Grid view">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button data-aos="zoom-in" className={styles.view_button} aria-label="List view">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="4" rx="1" />
                <rect x="3" y="10" width="18" height="4" rx="1" />
                <rect x="3" y="16" width="18" height="4" rx="1" />
              </svg>
            </button>
          </div>
          <select className={styles.sort_select}>
            <option>Popularity</option>
            <option>Rating</option>
            <option>Release Date</option>
            <option>Title A-Z</option>
          </select>
        </div>
      </div>
      <div className={styles.movies_grid}>
        {movies.length >= 1 ?movies.map((movie) => (
          <MovieCard3 key={movie.id} movie={movie} />
        )) : <div className="error-msg"> Movie is't be avabile now </div>}
      </div>
    </>
  )
}

