import { Link } from "react-router-dom";
import { FaPlay, FaStar } from "react-icons/fa";
import { posterUrl } from "../lib/tmdb";

export default function MovieCard({ movie, index = 0 }) {
  const poster = posterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Unknown";

  return (
    <article
      className="movie-card"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-image">
          {poster ? (
            <img src={poster} alt={movie.title} loading="lazy" />
          ) : (
            <div className="no-image">No Image</div>
          )}

          <div className="movie-rating">
            <FaStar />
            <span>{Number(movie.vote_average || 0).toFixed(1)}</span>
          </div>

          <div className="movie-overlay">
            <span className="movie-overlay-btn">
              <FaPlay />
              View Details
            </span>
          </div>
        </div>

        <div className="movie-info">
          <h3 title={movie.title}>{movie.title}</h3>
          <p>{year}</p>
        </div>
      </Link>
    </article>
  );
}
