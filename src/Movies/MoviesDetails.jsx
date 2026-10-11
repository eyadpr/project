import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBookmark,
  FaCalendar,
  FaClock,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { backdropUrl, posterUrl, tmdbFetch } from "../lib/tmdb";
import {
  getFavorites,
  getWatchlist,
  toggleStoredMovie,
} from "../lib/storage";

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getMovie() {
      setLoading(true);
      setError("");

      try {
        const data = await tmdbFetch(`/movie/${movieId}?language=en-US`);
        if (cancelled) return;

        setMovie(data);
        setIsFavorite(getFavorites().some((item) => item.id === data.id));
        setIsWatchlist(getWatchlist().some((item) => item.id === data.id));
      } catch (err) {
        console.error("Movie details error:", err);
        if (!cancelled) {
          setError("Could not load movie details. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (movieId) {
      getMovie();
    } else {
      setError("Movie ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/#movies");
    }
  };

  const toggleFavorite = () => {
    if (!movie) return;
    toggleStoredMovie("favorites", movie, isFavorite);
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    if (!movie) return;
    toggleStoredMovie("watchlist", movie, isWatchlist);
    setIsWatchlist(!isWatchlist);
  };

  if (loading) {
    return <div className="details-loading">Loading movie...</div>;
  }

  if (error || !movie) {
    return (
      <div className="details-loading">
        {error || "Movie not found."}
        <button className="back-btn" type="button" onClick={goBack}>
          Back to Movies
        </button>
      </div>
    );
  }

  const poster = posterUrl(movie.poster_path);
  const backdrop = backdropUrl(movie.backdrop_path);

  return (
    <section
      className="movie-details"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(5, 5, 5, 0.98) 0%,
            rgba(5, 5, 5, 0.88) 35%,
            rgba(5, 5, 5, 0.55) 70%,
            rgba(5, 5, 5, 0.9) 100%
          ),
          ${backdrop ? `url("${backdrop}")` : "none"}
        `,
      }}
    >
      <div className="details-container">
        <button className="back-btn" type="button" onClick={goBack}>
          ← Back to Movies
        </button>

        <div className="details-content">
          <div className="details-poster">
            {poster ? (
              <img src={poster} alt={movie.title} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>

          <div className="details-info">
            <span className="details-label">MOVIE DETAILS</span>
            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span className="details-rating">
                <FaStar />
                {Number(movie.vote_average || 0).toFixed(1)}
              </span>
              <span>
                <FaCalendar />
                {movie.release_date || "N/A"}
              </span>
              <span>
                <FaClock />
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </span>
            </div>

            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <div className="movie-overview">
              <h2>Overview</h2>
              <p>{movie.overview || "No overview available."}</p>
            </div>

            <div className="details-buttons">
              <button
                type="button"
                className={`details-btn ${isFavorite ? "active-btn" : ""}`}
                onClick={toggleFavorite}
              >
                <FaHeart />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                type="button"
                className={`details-btn ${isWatchlist ? "active-btn" : ""}`}
                onClick={toggleWatchlist}
              >
                <FaBookmark />
                {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
