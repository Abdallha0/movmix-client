import { Header } from "@/app/components/watchlist/header"
import { Bookmark } from "lucide-react"
import { Stats } from "@/app/components/watchlist/stats"
import { FilterSec } from "@/app/components/watchlist/filterSec"
import MovieCard2 from "@/app/components/cards/movie-card2"
import "./watchlist.css"

const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.8,
    runtime: "2h 46m",
    poster: "/dune-part-two-movie-poster-desert-sci-fi.jpg",
    genres: ["Sci-Fi", "Adventure"],
    status: "watching",
    progress: 65,
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.5,
    runtime: "3h 0m",
    poster: "/oppenheimer-movie-poster-atomic-bomb-drama.jpg",
    genres: ["Drama", "History"],
    status: "completed",
    progress: 100,
  },
  {
    id: 3,
    title: "The Batman",
    year: 2022,
    rating: 7.8,
    runtime: "2h 56m",
    poster: "/the-batman-movie-poster-dark-gothic.jpg",
    genres: ["Action", "Crime"],
    status: "plan-to-watch",
    progress: 0,
  },
  {
    id: 4,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    runtime: "2h 49m",
    poster: "/interstellar-wormhole-poster.png",
    genres: ["Sci-Fi", "Drama"],
    status: "completed",
    progress: 100,
  },
  {
    id: 5,
    title: "Poor Things",
    year: 2023,
    rating: 8.0,
    runtime: "2h 21m",
    poster: "/poor-things-movie-poster-victorian-surreal.jpg",
    genres: ["Comedy", "Drama"],
    status: "watching",
    progress: 30,
  },
  {
    id: 6,
    title: "Killers of the Flower Moon",
    year: 2023,
    rating: 7.7,
    runtime: "3h 26m",
    poster: "/killers-flower-moon-movie-poster-western.jpg",
    genres: ["Crime", "Drama"],
    status: "plan-to-watch",
    progress: 0,
  },
  {
    id: 7,
    title: "The Holdovers",
    year: 2023,
    rating: 7.9,
    runtime: "2h 13m",
    poster: "/the-holdovers-movie-poster-winter-school.jpg",
    genres: ["Comedy", "Drama"],
    status: "completed",
    progress: 100,
  },
  {
    id: 8,
    title: "Past Lives",
    year: 2023,
    rating: 7.9,
    runtime: "1h 46m",
    poster: "/past-lives-movie-poster-romantic-drama.jpg",
    genres: ["Romance", "Drama"],
    status: "plan-to-watch",
    progress: 0,
  },
]

export default function WatchlistPage() {
  return (
    <div className="watchlist-page">
      <Header />

      <main className="watchlist-main">

        <div className="page-title-section">
          <h1 className="page-title">
            <Bookmark size={32} />
            My Watchlist
            <span className="movie-count">8 movies</span>
          </h1>
          <p className="page-subtitle">Track and manage your favorite movies to watch</p>
        </div>

        <Stats />

        <FilterSec />

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard2 genres={movie.genres} poster={movie.poster} runTime={movie.runtime} year={movie.year} key={movie.id} progress={movie.progress} rating={movie.rating} title={movie.title} />
          ))}
        </div>
      </main>
    </div>
  )
}
