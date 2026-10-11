import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";
import { getWatchlist } from "../lib/storage";
import { posterUrl } from "../lib/tmdb";

export default function Watchlist() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const removeMovie = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <section className="saved-section">
      <div className="saved-container">
        <h1>
          My <span>Watchlist</span>
        </h1>

        {movies.length === 0 ? (
          <p className="empty-message">Your watchlist is empty.</p>
        ) : (
          <div className="saved-grid">
            {movies.map((movie) => {
              const poster = posterUrl(movie.poster_path);
              return (
                <article className="saved-card" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    {poster ? (
                      <img src={poster} alt={movie.title} />
                    ) : (
                      <div className="no-image saved-no-image">No Image</div>
                    )}
                  </Link>

                  <div className="saved-info">
                    <h3>
                      <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </h3>
                    <p>
                      <FaStar />
                      {Number(movie.vote_average || 0).toFixed(1)}
                    </p>
                    <button type="button" onClick={() => removeMovie(movie.id)}>
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
