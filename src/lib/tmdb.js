const API_ROOT = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

export function getTmdbToken() {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("TMDB token is missing from the .env file.");
  }

  return token;
}

export function tmdbHeaders() {
  return {
    accept: "application/json",
    Authorization: `Bearer ${getTmdbToken()}`,
  };
}

export async function tmdbFetch(path) {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: tmdbHeaders(),
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export function posterUrl(path) {
  return path ? `${IMAGE_URL}${path}` : null;
}

export function backdropUrl(path) {
  return path ? `${BACKDROP_URL}${path}` : null;
}
