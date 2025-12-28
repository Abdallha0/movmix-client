"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import styles from "./css/similar-movies.module.css"
import { getSimilarMovies } from "@/app/api/movies-api-utils"
import Link from "next/link";

export function SimilarMovies({ id, genre }: { id: number, genre: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const res = await getSimilarMovies(id, 2);
      if (!res) return;

      setSimilarMovies(res.data);
    }

    fetchData();
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>More Like This</h2>
          <p className={styles.subtitle}>Because you're interested in {genre}</p>
        </div>
        <div className={styles.controls}>
          <button className={styles.scrollButton} onClick={() => scroll("left")} aria-label="Scroll left">
            <ChevronLeft size={20} />
          </button>
          <button className={styles.scrollButton} onClick={() => scroll("right")} aria-label="Scroll right">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollContainer}>
        {similarMovies.length >= 1 ? similarMovies.filter((i: any) => !i.poster && !i.title).map((movie: any, i: number) => (
          <div key={movie.id || i} className={styles.movieCard}>
            <div className={styles.imageWrapper}>
              <img
                src={movie.poster || ""}
                className={styles.movieImage}
              />

              <div className={styles.hoverOverlay}>
                <Link href={`/stream/${movie.id}/${movie.title.split(" ").join("-")}`}>
                  <button className={styles.playButton} aria-label="Play">
                    <Play size={20} fill="currentColor" />
                  </button>
                </Link>
                <button className={styles.addButton} aria-label="Add to list">
                  <Plus size={20} />
                </button>
              </div>

              <span className={styles.ratingBadge}>{movie.rating ? `★${movie.rating}` : ""}</span>
            </div>

            <h3 className={styles.movieTitle}>{movie.title || ""}</h3>
            <p className={styles.movieYear}>{movie.year || ""}</p>
          </div>
        )) : <></>}
      </div>
    </section>
  )
}
