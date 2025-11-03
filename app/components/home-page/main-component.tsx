"use client"
import AOS from "aos";
import { useEffect, useState } from "react"
import { useSessionStatus } from "../../hooks/session-status";
import MovieCard from "../cards/movie-card";
import Search from "../forms/search-form";
import Vtabs from "../tabs/vertical-tabs";
import Featured from "./featured-movie";
import Header from "./header";
import MovieDetails from "./movie-details";
import SlideSection from "./slideSection";
import Sidebar from "./sidebar";
import styles from "./css/hero.module.css"
import { nowPlay } from "@/app/api/movies/tmdb";
import MovieGrid from "./movie-grid";

function Home() {
    const status = useSessionStatus();
    useEffect(() => { AOS.init({ duration: 1000, once: true }) }, []);
  const [data, setData] = useState<any[]>([]);
  const [activeI, setActiveI] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await nowPlay(1, true, 1);

      if (!res.status) {
        setIsLoading(false);
        setErrorMsg(res.message);
        setData([]);
        return;
      }

      setData(res.movies || []);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!data.length) return;


    if (!data[activeI]?.backdrop) {
      setActiveI((prev) => {
        const next = prev + 1 >= data.length ? 0 : prev + 1;
        return next;
      });
      return;
    }


    const timer = setTimeout(() => {
      setActiveI((prev) => {
        const next = prev + 1 >= data.length ? 0 : prev + 1;
        return next;
      });
    }, 10000);


    return () => clearTimeout(timer);
  }, [activeI, data]);

    if (status === "loading" || isLoading) return <div className="loader"></div>

    return (
        <div className="home-page">
            <Header name="Abdallha M" photo={null} />
            <Sidebar active="home" name="Abdallha Mohamed" />
            <section className={styles.hero} style={{ backgroundImage: ` linear-gradient(rgba(32 32 32 / 50%), rgb(32 32 32 / 50%)), url(${data[activeI]?.backdrop})` }}>
                <Search animation="fade-right" />
                <MovieDetails title={data[activeI]?.title} ratting={data[activeI]?.ratting} overview={data[activeI]?.overview} />
                <SlideSection data={data} />
            </section>

            <section className="sec2">
                <Vtabs active="Trending" items={["Trending", "Most Watch", "Recently added", "Top Movies"]} />
                <Vtabs active="Animation" items={["Action", "Adventure", "Animation", "Romance", "Horror", "Comedy"]} />
                <MovieGrid />
            </section>

            <section className="section">
                <Featured activeTab="info" img={data[3].backdrop} title={data[3].title} overview={data[3].title} />
            </section>
        </div>
    )
}

export default Home
