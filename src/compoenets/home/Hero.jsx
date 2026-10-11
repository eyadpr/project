import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaPlay, FaStar } from "react-icons/fa";
import { backdropUrl, tmdbFetch } from "../../lib/tmdb";

export default function Hero() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFeatured() {
      try {
        const data = await tmdbFetch("/movie/popular?language=en-US&page=1");
        const movie = data.results?.[0];
        if (!cancelled && movie) {
          setFeatured(movie);
        }
      } catch (error) {
        console.error("Hero featured movie error:", error);
      }
    }

    loadFeatured();

    return () => {
      cancelled = true;
    };
  }, []);

  const backgroundImage = featured?.backdrop_path
    ? `linear-gradient(90deg, #050505 0%, rgba(5, 5, 5, 0.92) 38%, rgba(5, 5, 5, 0.45) 72%, rgba(5, 5, 5, 0.9) 100%), url("${backdropUrl(featured.backdrop_path)}")`
    : undefined;

  return (
    <section
      className={`hero${featured?.backdrop_path ? " has-backdrop" : ""}`}
      style={backgroundImage ? { backgroundImage } : undefined}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-badge">
            {featured ? "Now Trending" : "#1 Trending Movie"}
          </span>

          <h1>
            {featured ? (
              featured.title
            ) : (
              <>
                Discover Your
                <span> Next Favorite </span>
                Movie
              </>
            )}
          </h1>

          <p>
            {featured?.overview ||
              "Explore thousands of movies, discover new stories, and find something amazing to watch tonight."}
          </p>

          {featured && (
            <div className="hero-rating">
              <FaStar />
              <span>{Number(featured.vote_average || 0).toFixed(1)}</span>
              <span className="rating-text">TMDB Rating</span>
            </div>
          )}

          <div className="hero-buttons">
            <button
              type="button"
              className="premium-btn"
              onClick={() => {
                if (featured?.id) {
                  navigate(`/movie/${featured.id}`);
                } else {
                  document.getElementById("movies")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              <FaPlay />
              <span>Watch Now</span>
            </button>

            <button
              type="button"
              className="outline-btn"
              onClick={() => {
                document.getElementById("movies")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <FaInfoCircle />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
