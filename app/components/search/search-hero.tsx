"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./css/search-hero.module.css"
interface SearchHeroProps {
  searchQuery: string
}

export function SearchHero({ searchQuery }: SearchHeroProps) {
    const [query, setQuery] = useState(searchQuery);
    const router = useRouter();

    async function handleSubmite(e: any) {
        e.preventDefault();
        if (!query) return;

        router.push(`/search?q=${query.split(" ").join("-")}`)
    }
  return (
    <section className={styles.search_hero}>
      <h1 className={styles.search_title} data-aos='fade-down'>Discover Movies</h1>
      <p className={styles.search_subtitle} data-aos="fade-right">Explore millions of movies, TV shows and people to discover</p>
      <div className={styles.search_container}>
        <form onSubmit={handleSubmite} className={styles.search_wrapper} data-aos="zoom-out">
          <div className={styles.search_icon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            className={styles.search_input}
            placeholder="Search for movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search_button}>Search</button>
        </form>
      </div>
    </section>
  )
}

