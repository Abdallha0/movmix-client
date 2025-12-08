"use client"
import styles from "./css/sidebar.module.css"
interface SidebarProps {
  selectedGenres: string[]
  onToggleGenre: (genre: string) => void
}

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
]

export function Sidebar({ selectedGenres, onToggleGenre }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.filter_section}>
        <h3 className={styles.filter_title}>Genres</h3>
        <div className={styles.filter_options}>
          {genres.map((genre) => (
            <div
              key={genre}
              className={`${styles.filter_option} ${selectedGenres.includes(genre) ? "active" : ""}`}
              onClick={() => onToggleGenre(genre)}
            >
              <div className={styles.filter_checkbox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className={styles.filter_label}>{genre}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filter_section}>
        <h3 className={styles.filter_title}>Rating</h3>
        <div className={styles.rating_slider}>
          <div className={styles.rating_track}>
            <div className={styles.rating_fill}></div>
          </div>
          <div className={styles.rating_value}>
            <span>0</span>
            <span>7.0+</span>
          </div>
        </div>
      </div>

      <div className={styles.filter_section}>
        <h3 className={styles.filter_title}>Release Year</h3>
        <div className={styles.year_inputs}>
          <input type="text" className={styles.year_input} placeholder="From" defaultValue="2020" />
          <input type="text" className={styles.year_input} placeholder="To" defaultValue="2024" />
        </div>
      </div>
    </aside>
  )
}

