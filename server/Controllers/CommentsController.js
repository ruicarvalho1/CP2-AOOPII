import Comment from '../Models/commentsModel.js';
import mongoose from 'mongoose';

export const getCommentsByMovieId = async (req, res) => {
    try {
        const { movieId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const comments = await Comment.find({ movie_id: movieId });

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this movie' });
        }


        res.status(200).json(comments);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments', error: err.message });
    }
};