"use client"
import { useEffect, useRef, useState } from "react"
import { SearchHero } from "./search-hero"
import { MovieGrid } from "./movie-grid"
import { Pagination } from "./pagination"
import { searchMovie } from "@/app/api/movies/server"
import { useToast } from "@/app/providers/toastProvider"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import AOS from "aos";

export function MovieSearchPage() {
  useEffect(() => { AOS.init({ duration: 1000, once: true }) }, []);
  const params = useSearchParams();
  const query: string = params.get("q")?.split("-").join(" ") || "";
  const [currentPage, setCurrentPage] = useState(1)
  const { showToast } = useToast();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        const res = await searchMovie(query);
        if (!res?.status) {
          setLoading(false);
          return;
        }
        console.log(res)
        setData(res.data);
      } catch (err) {
        showToast("Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);
  if (loading) return <div className="loader"></div>;

  return (
    <div className="search-page">
      <header className="navbar"> <Link href="/home" className="logo"> Movmix </Link> </header>
      <main className="main-container">
        <SearchHero searchQuery={query || data.query} />
        <div className="content-layout">
          <div className="main-content">
            <MovieGrid movies={data.movies} searchQuery={query || data.query} />
            {data.totalPages > 8 && <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={setCurrentPage} />}
          </div>
        </div>
      </main>
    </div>
  )
}

