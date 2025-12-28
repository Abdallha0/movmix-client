import { mangePlayList } from "@/app/api/server";
import styles from "./css/movie-card3.module.css";
import Link from "next/link";
import { useToast } from "@/app/providers/toastProvider";
import React from "react";
interface Movie {
  id: number | string
  title: string
  year?: number
  rating?: number
  genre?: string
  poster: string
}

interface MovieCardProps {
  movie: Movie
}

export function MovieCard3({ movie }: MovieCardProps) {
  const { showToast } = useToast();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    const res = await mangePlayList("set", movie.id, movie.title, movie.poster, movie.year, movie.rating, 0, movie.genre);
    showToast(res.message, res.status ? "success" : "error");
  }
  return (
    <article className={styles.movie_card} data-aos="zoom-in">
      <div className={styles.movie_poster}>
        <img src={movie.poster || "/placeholder.svg"} alt={movie.title} loading="lazy" />
        {movie.rating && <div className={styles.movie_rating_badge}>
          <span className={styles.rating_star}>★</span>
          <span>{movie.rating}</span>
        </div>}
        <div className={styles.movie_overlay}>
          <div className={styles.overlay_buttons}>
            <Link href={`/stream/${movie.id}/${movie.title.split(" ").join("-")}`}>
              <button className={`${styles.overlay_button} ${styles.play}`} aria-label="Watch">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            </Link>
            <button className={`${styles.overlay_button} ${styles.secondary}`} aria-label="Add to favorites">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button onClick={(e) => handleClick(e)} className={`${styles.overlay_button} ${styles.secondary}`} aria-label="Add to Play List">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.movie_info}>
        <h3 className={styles.movie_title}>{movie.title}</h3>
        {(movie.genre && movie.year) && <div className={styles.movie_meta}>
          <span className={styles.movie_year}>{movie.year}</span>
          <span className={styles.movie_genre}>{movie.genre}</span>
        </div>}
      </div>
    </article>
  )
}

