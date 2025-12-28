"use client"
import { Header } from "@/app/components/watchlist/header"
import { Bookmark } from "lucide-react"
import { FilterSec } from "@/app/components/watchlist/filterSec"
import MovieCard2 from "@/app/components/cards/movie-card2"
import styles from "./watchlist.module.css"
import { useEffect, useState } from "react"
import { mangePlayList } from "@/app/api/server"
import { useSessionStatus } from "@/app/hooks/session-status"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/providers/toastProvider"
import Sidebar from "@/app/components/home-page/sidebar";

export default function Page() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("Recently Added")

  const { sessionStatus } = useSessionStatus();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await mangePlayList("get");

      if (!res.status) {
        serError(res.message);
        setIsLoading(false);
        return;
      }

      setMovies(res.data);
      setIsLoading(false);
    }

    if (sessionStatus === "authenticated") {
      fetchData();
    } 

  }, [sessionStatus])

  async function removeMovie(id: string | number) {
    let res = await mangePlayList("remove", id);
    if (!res.status) {
      showToast(res.message);
      return;
    }
    setMovies(prev => prev.filter((i: any) => i.id !== id))
  }

  if (isLoading || sessionStatus === "loading") return <div className="loader"></div>
  if (error) return <div className="error-msg">{error}</div>

  const filteredMovies = movies
    .filter((i: any) => filter === "all" ? true : i.status === filter)
    .sort((a: any, b: any) => {
      if (sorting === "Title") return a.title.localeCompare(b.title);
      if (sorting === "Rating") return b.rating - a.rating;
      if (sorting === "Year") return b.year - a.year;
      return 0;
    })

  return (
    <div className={styles.watchlist_page}>
      <Header />
      <main className={styles.watchlist_main}>

        <div className={styles.page_title_section}>
          <h1 className={styles.page_title}>
            <Bookmark size={32} />
            My Watchlist
            <span className={styles.movie_count}>{movies.length}</span>
          </h1>
          <p className={styles.page_subtitle}>Track and manage your favorite movies to watch</p>
        </div>

        <FilterSec filter={filter} setFilter={setFilter} sorting={sorting} setSorting={setSorting} />

        <div className={styles.movies_grid}>
          {filteredMovies.length > 0 ? filteredMovies.map((movie: any) => (
            <MovieCard2
              id={movie.id}
              key={movie.id}
              genres={movie.genres}
              poster={movie.poster}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              progress={movie.progress}
              removeMovie={removeMovie}
              Mstatus={movie.status}
            />
          )) : (
            <div className={styles.error_conteiner}>
              <h2 className="error-msg">No movies in your watchlist</h2>
              <Link href="/home" style={{color: "var(--brand-color)"}}>Add some movies</Link>
            </div>
          )}
        </div>
      </main>
      <Sidebar active="play list" />
    </div>
  )
}
