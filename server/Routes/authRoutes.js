import express from 'express';
import {getMovieById, getMovies} from "../Controllers/moviesController.js";
import {getCommentsByMovieId} from "../Controllers/CommentsController.js";

const router = express.Router();


router.get('/movies', getMovies);
router.get('/movies/:id', getMovieById);
router.get('/movies/:movieId/comments', getCommentsByMovieId);


export default router;

