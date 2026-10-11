import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import MovieCard from "../compoenets/MovieCard";
import { tmdbFetch } from "../lib/tmdb";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function getMovies() {
      try {
        const data = await tmdbFetch("/movie/popular?language=en-US&page=1");
        if (cancelled) return;
        setMovies(data.results || []);
        setPage(1);
        setHasMore((data.page || 1) < (data.total_pages || 1));
      } catch (err) {
        console.error("Movies API error:", err);
        if (!cancelled) {
          setError("Movies could not be loaded.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    getMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  async function loadMore() {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await tmdbFetch(
        `/movie/popular?language=en-US&page=${nextPage}`
      );
      const incoming = data.results || [];
      setMovies((current) => {
        const seen = new Set(current.map((movie) => movie.id));
        return [...current, ...incoming.filter((movie) => !seen.has(movie.id))];
      });
      setPage(nextPage);
      setHasMore(nextPage < (data.total_pages || nextPage));
    } catch (err) {
      console.error("Load more movies error:", err);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <section className="movies-section" id="movies">
        <div className="movies-container">
          <div className="movies-loading">Loading Movies...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="movies-section" id="movies">
        <div className="movies-container">
          <div className="movies-error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="movies-section" id="movies">
      <div className="movies-container">
        <div className="movies-header">
          <div>
            <span className="section-small-title">EXPLORE</span>
            <h2>
              Popular <span>Movies</span>
            </h2>
          </div>

          {hasMore && (
            <button
              type="button"
              className="view-all-btn"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "View All"} <FaArrowRight />
            </button>
          )}
        </div>

        <div className="movies-grid">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
