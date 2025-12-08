import { Calendar, Clock, Play, Plus, Star, X } from "lucide-react";

interface DataTypes {
    title: string;
    poster: string;
    rating: number;
    year: number;
    runTime: string | number;
    progress: number;
    genres: Array<string>
}
function MovieCard2({ title, poster, rating, year, runTime, progress, genres }: DataTypes) {
    return (
        <article className="movie-card">
            <div className="movie-poster-container">
                <img src={poster || "/placeholder.svg"} alt={title} className="movie-poster" />

                {/* Badges */}
                <div className="card-badges">
                    <div className="rating-badge">
                        <Star size={14} fill="currentColor" />
                        {rating}
                    </div>
                    <span className={`status-badge ${status}`}>
                        {status === "plan-to-watch" ? "Plan" : status}
                    </span>
                </div>

                {/* Quick Remove */}
                <button className="quick-remove" aria-label="Remove from watchlist">
                    <X size={16} />
                </button>

                {/* Hover Overlay */}
                <div className="poster-overlay">
                    <div className="overlay-actions">
                        <button className="action-btn primary">
                            <Play size={16} fill="currentColor" />
                            Watch
                        </button>
                        <button className="action-btn secondary">
                            <Plus size={16} />
                            Info
                        </button>
                    </div>
                </div>
            </div>

            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <div className="movie-meta">
                    <span>
                        <Calendar size={12} />
                        {year}
                    </span>
                    <span>
                        <Clock size={12} />
                        {runTime}
                    </span>
                </div>
                <div className="movie-genres">
                    {genres.map((genre) => (
                        <span key={genre} className="genre-tag">
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Progress for watching movies */}
                {status === "watching" && (
                    <div className="progress-container">
                        <div className="progress-label">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

export default MovieCard2