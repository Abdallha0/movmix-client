"use client"

import { useState } from "react"
import { Heart, Play, Plus, Volume2, VolumeX } from "lucide-react"
import styles from "./css/movie-hero.module.css";
import { useToast } from "@/app/providers/toastProvider";
import { mangePlayList, user_data_mangment } from "@/app/api/movies/server";
import HeartFill from "../icons/heart-fill";

interface HeroData {
  setShowVedio: (s: { call: boolean }) => void;
  title: string;
  id: string | number;
  backdrop: string;
  metascore: number;
  runtime: string;
  year: number;
  rated: string;
  poster: string;
  rating: number;
  overview: string;
  genres: Array<string>;
  liked: boolean;
}

export function MovieHero({ setShowVedio, id, poster, title, runtime, year, backdrop, metascore, rated, rating, overview, genres, liked }: HeroData) {
  const [isMuted, setIsMuted] = useState(true);
  const [like, setLiked] = useState(liked);

  function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  }

  const { showToast } = useToast();
  async function handleClick() {
    const res = await mangePlayList("set", id, title, poster, year, rating, 0, genres[0]);
    showToast(res.message, res.status ? "success" : "error");
  }


  async function handleLike() {
     await user_data_mangment("set-like", { m_id: id, poster: poster, rating: rating, title: title, year: year });
    setLiked(true)

  }

  async function handleRemoveLike() {
    await user_data_mangment("delete-like", { m_id: id });
    setLiked(false)

  }
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop}>
        <img
          src={backdrop}
          alt=""
          className={styles.backdropImage}
        />
        <div className={styles.gradientTop} />
        <div className={styles.gradientLeft} />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span className={styles.match}>{metascore || rating.toString().split(".").join("")}% Match</span>
            <span>{year}</span>
            <span className={styles.rating}>{rated}</span>
            <span>{formatTime(parseInt(runtime))}</span>
            <span className={styles.stars}>★ {rating}</span>
          </div>

          <p className={styles.description}>{overview}</p>

          <div className={styles.genres}>
            {genres.map((genre) => (
              <span key={genre} className={styles.genre}>
                {genre}
                <span className={styles.genreDot}>•</span>
              </span>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.playButton} onClick={() => setShowVedio({ call: true })}>
              <Play size={20} fill="currentColor" />
              Play
            </button>
            <button onClick={handleClick} className={styles.listButton}>
              <Plus size={20} />
              Play List
            </button>
            {
              like ? <button className={styles.iconButton} aria-label="Like" onClick={handleRemoveLike}>
                <HeartFill size={20} color="red" />
              </button> : <button className={styles.iconButton} aria-label="Like" onClick={handleLike}>
                <Heart size={20} />
              </button>
            }
          </div>
        </div>

        <button
          className={styles.muteButton}
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </section>
  )
}
