import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaBookmark,
  FaFilm,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("query") || "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark movie-navbar sticky-top">
      <div className="container">
        <NavLink className="navbar-brand movie-logo" to="/">
          <span className="logo-icon">
            <FaFilm />
          </span>
          <span>
            Movie<span className="yellow">Hub</span>
          </span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                <FaHome />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/#movies">
                <FaFilm />
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites">
                <FaHeart />
                Favorites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/watchlist">
                <FaBookmark />
                Watchlist
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                <FaInfoCircle />
                About
              </NavLink>
            </li>
          </ul>

          <form
            className="search-form"
            key={currentQuery}
            onSubmit={(event) => {
              event.preventDefault();
              const query = event.target.search.value.trim();
              if (query) {
                navigate(`/search?query=${encodeURIComponent(query)}`);
              }
            }}
          >
            <div className="search-input">
              <FaSearch />
              <input
                type="search"
                name="search"
                defaultValue={currentQuery}
                placeholder="Search movies..."
                aria-label="Search movies"
              />
            </div>
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
