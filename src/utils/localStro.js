export const addMovieLocal = (movie) => {
  let historyMovie = localStorage.getItem("phimmoi-history")
    ? JSON.parse(localStorage.getItem("phimmoi-history"))
    : [];

  const existMovie = historyMovie.some((p) => p.id === movie.id);

  if (existMovie) {
    historyMovie = historyMovie.filter((item) => item.id !== movie.id);
  }

  historyMovie.push(movie);
  localStorage.setItem("phimmoi-history", JSON.stringify(historyMovie));
};

export const getMovieHistory = () => {
  const historyMovie = localStorage.getItem("phimmoi-history")
    ? JSON.parse(localStorage.getItem("phimmoi-history"))
    : [];

  const result = historyMovie.sort((a, b) => b.viewAt - a.viewAt);

  return result;
};
