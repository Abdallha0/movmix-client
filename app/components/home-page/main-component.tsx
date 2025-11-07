"use client"
import AOS from "aos";
import { useEffect, useState } from "react"
import { useSessionStatus } from "../../hooks/session-status";
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
import Vedio from "../vedio";

function Home() {
  const status = useSessionStatus();
  useEffect(() => { AOS.init({ duration: 1000, once: true }) }, []);
  const [data, setData] = useState<any[]>([]);
  const [activeI, setActiveI] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeItem, setActiveItem] = useState<"Trending" | "Popular" | "Recently added" | "Top Movies">("Trending");
  const [activeGerne, setActiveGenre] = useState<"Action" | "Abenteuer" | "Animation" | "Romance" | "Horror" | "Comedy">("Action")
  const [vedio, setVedio] = useState({
    title: "",
    url: "",
    call: false,
  })

  useEffect(() => {
    async function fetchData() {
      const res = await nowPlay(1, true, 1, true);

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
        <MovieDetails setVedio={setVedio} id={data[activeI]?.tmdb} title={data[activeI]?.title} ratting={data[activeI]?.ratting} overview={data[activeI]?.overview} />
        <SlideSection data={data} />
      </section>

      <section className="sec2">
        <Vtabs active={activeItem} setActiveItem={setActiveItem} items={["Trending", "Popular", "Recently added", "Top Movies"]} />
        <Vtabs active={activeGerne} setActiveGenre={setActiveGenre} items={["Action", "Abenteuer", "Animation", "Romance", "Horror", "Comedy"]} />
        <MovieGrid activeItem={activeItem} activeGerne={activeGerne} />
      </section>

      <section className="section">
        <Featured vedio={vedio} setVedio={setVedio} id={data[1]?.tmdb} img={data[1]?.backdrop} title={data[1]?.title} overview={data[1]?.overview} />
      </section>
      {vedio.call && <Vedio title={vedio.title} setVedio={setVedio} url={vedio.url} />}
    </div>
  )
}

export default Home
