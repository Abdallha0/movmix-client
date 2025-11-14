"use client";
import { useSearchParams } from "next/navigation";
import styles from "./css/search-container.module.css";
import { useEffect, useRef, useState } from "react";
import { searchMovie } from "@/app/api/movies/server";
import { useToast } from "@/app/providers/toastProvider";
import MovieCard2 from "../cards/movie-card2";
import Sidebar from "../home-page/sidebar";

function SearchContaienr() {
  const params = useSearchParams();
  const query = params.get("q")?.split("-").join(" ");
  const { showToast } = useToast();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

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

        setData([res.data]);
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
    <>
      <div className={styles.title}>
        <h2>{data.length >= 1 ? query || "" : ""}</h2>
      </div>

      <div className={styles.content}>
        {data.length >= 1 ?
          data.map((item: any, i: any) => (
            <MovieCard2
              key={item.imdb || i}
              year={item.year || 0}
              id={item.imdb || ""}
              title={item.title || ""}
              runTime={item.runtime || ""}
              ratting={item.rating || ""}
              ratingSource={item.ratingSource || ""}
              overview={item.overview || ""}
              img={item.poster || ""}
              country={item.country?.split(",")[0] || ""}
            />
          ))
          :
          <div className="not-found">Cannot find any results about: {query}</div>
        }
      </div>
      
      <Sidebar active="home" name="Abdallha Mohamed" />
    </>
  );
}

export default SearchContaienr;

