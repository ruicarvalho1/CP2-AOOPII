import express from 'express';
import {
    getMovieById,
    getMovies,
    getTopMoviesByGenre,
    updateMovie
} from "../Controllers/moviesController.js";
import {getCommentsByMovieId, createComment, deleteComment} from "../Controllers/CommentsController.js";
import {registerUser, loginUser, logoutUser,} from '../Controllers/authController.js';
import { protect } from '../Middlewares/authMiddleware.js';

const router = express.Router();


/* Advanced queries */
router.get('/movies/top-by-genre',protect, getTopMoviesByGenre);

router.get('/movies', protect, getMovies);
router.get('/movies/:id', protect, getMovieById);
router.put('/movies/:id', updateMovie);

router.get('/movies/:movieId/comments', protect, getCommentsByMovieId);
router.post('/movies/:movieId/comments',protect, createComment);
router.delete('/comments/:commentId', protect, deleteComment);


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});


export default router;

