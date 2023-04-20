import express from "express";
import {
  home,
  movieDetail,
  filterMovie,
  addMoviePage,
} from "./movieController";

const movieRouter = express.Router();

movieRouter.route("/").get(home).post(addMoviePage);
movieRouter.get("/movie/:id", movieDetail);
movieRouter.route("/filterMovie").get(filterMovie).post(filterMovie);
movieRouter.get("/add-movie", addMoviePage);

export default movieRouter;
