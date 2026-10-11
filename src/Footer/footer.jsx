import { Link } from "react-router-dom";
import "./footer.css";
import {
  FaFacebookF,
  FaFilm,
  FaHeart,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="movie-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <FaFilm />
            <span>
              Movie<span>Hub</span>
            </span>
          </Link>

          <p>
            Your ultimate destination for movies, series, and unforgettable
            entertainment.
          </p>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/#movies">Movies</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <Link to="/search?query=Action">Action</Link>
          <Link to="/search?query=Comedy">Comedy</Link>
          <Link to="/search?query=Drama">Drama</Link>
          <Link to="/search?query=Animation">Animation</Link>
        </div>

        <div className="footer-links">
          <h3>Information</h3>
          <Link to="/about">About Us</Link>
          <Link to="/about">Contact</Link>
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Terms & Conditions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 MovieHub. Made with <FaHeart /> for movie lovers.
        </p>
      </div>
    </footer>
  );
}
