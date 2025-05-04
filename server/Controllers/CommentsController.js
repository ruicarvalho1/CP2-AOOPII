import Comment from '../Models/commentsModel.js';
import mongoose from 'mongoose';

export const getCommentsByMovieId = async (req, res) => {
    try {
        const { movieId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const filter = { movie_id: new mongoose.Types.ObjectId(movieId) };

        const comments = await Comment.find(filter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Comment.countDocuments(filter);

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalComments: total,
            count: comments.length,
            comments
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments', error: err.message });
    }

};


export const createComment = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const username = req.user?.username || 'Anonymous';

        const newComment = new Comment({
            movie_id: new mongoose.Types.ObjectId(movieId),
            text,
            username,
            date: new Date()
        });

        await newComment.save();

        res.status(201).json({ message: 'Comment created', comment: newComment });
    } catch (err) {
        res.status(500).json({ message: 'Error creating comment', error: err.message });
    }
};





export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }

        const deleted = await Comment.findByIdAndDelete(commentId);

        if (!deleted) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting comment', error: err.message });
    }
};