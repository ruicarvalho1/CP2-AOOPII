import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    text: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comments', commentSchema);

export default Comment;