import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../compoenets/MovieCard";
import { tmdbFetch } from "../lib/tmdb";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function searchMovies() {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await tmdbFetch(
          `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
        );
        if (!cancelled) {
          setMovies(data.results || []);
        }
      } catch (err) {
        console.error("Movie search error:", err);
        if (!cancelled) {
          setMovies([]);
          setError("Could not search movies. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    searchMovies();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <section className="movies-section">
      <div className="movies-container">
        <div className="movies-header">
          <div>
            <span className="section-small-title">SEARCH</span>
            <h2>
              Results for <span>"{query || "All Movies"}"</span>
            </h2>
          </div>
        </div>

        {loading && <div className="movies-loading">Searching Movies...</div>}

        {!loading && error && <div className="movies-error">{error}</div>}

        {!loading && !error && !query && (
          <div className="movies-loading">
            Enter a movie title in the search bar.
          </div>
        )}

        {!loading && !error && query && movies.length === 0 && (
          <div className="movies-loading">No movies found.</div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
