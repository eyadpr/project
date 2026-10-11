function readList(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFavorites() {
  return readList("favorites");
}

export function getWatchlist() {
  return readList("watchlist");
}

export function toggleStoredMovie(key, movie, isStored) {
  const list = readList(key);
  const next = isStored
    ? list.filter((item) => item.id !== movie.id)
    : [...list.filter((item) => item.id !== movie.id), movie];

  writeList(key, next);
  return next;
}
