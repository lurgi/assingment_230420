import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
  addMovie,
} from "./db";

export const home = (req, res) => {
  const movies = getMovies();
  return res.render("home", { pageTitle: "Movies", movies });
};
export const movieDetail = (req, res) => {
  const { id } = req.params;
  const movieDetail = getMovieById(id);
  return res.render("movieDetail", {
    pageTitle: `Movie Detail`,
    movieDetail,
  });
};
export const filterMovie = (req, res) => {
  const { year, rate } = req.body;
  let filterMovies;
  if (rate && year) {
    const minYear = year.split(" ")[0];
    const minRate = rate.split(" ")[0];
    const yearMovies = getMovieByMinimumYear(minYear);
    const rateMovies = getMovieByMinimumRating(minRate);

    filterMovies = yearMovies.filter((movie) => rateMovies.includes(movie));
  }

  return res.render("filterMovie", {
    pageTitle: "Search Movies",
    filterMovies,
  });
};
export const addMoviePage = (req, res) => {
  if (req.method === "GET") {
    return res.render("addMovie", { pageTitle: "Add Movie" });
  }
  if (req.method === "POST") {
    const movies = getMovies();
    movies.unshift({
      ...req.body,
      genres: req.body.genres.split(","),
      id: movies.length,
      rating: 0.0,
    });
    return res.render("home", { pageTitle: "Movies", movies });
  }
};
