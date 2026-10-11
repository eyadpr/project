import { Route, Routes } from "react-router-dom";
import Navbar from "./compoenets/Navbar";
import Hero from "./compoenets/home/Hero";
import Movies from "./Movies/Movies";
import MovieDetails from "./Movies/MoviesDetails";
import Favorites from "./navbarlinks/Favorites";
import Watchlist from "./navbarlinks/Watchlist";
import About from "./navbarlinks/About";
import Search from "./Search/search";
import Footer from "./Footer/footer";
import scrollToTop from "./compoenets/ScrollToTop";
import {
  getFavorites,
  getWatchlist,
  toggleStoredMovie,
} from "./lib/storage.js";


function Home() {
  return (
    <>
      <Hero />
      <Movies />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
