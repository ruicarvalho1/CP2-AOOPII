import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema({
    plot: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    fullplot: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    year: {
        type: Number,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    rated: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    awards: {
        wins: {
            type: Number,
            required: true
        },
        nominations: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    imdb: {
        rating: {
            type: Number,
            required: true
        },
        votes: {
            type: Number,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    countries: {
        type: [String],
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    tomatoes: {
        type: mongoose.Schema.Types.Mixed
    },
    num_mflix_comments: {
        type: Number,
        default: 0
    },
    lastupdated: {
        type: String
    }
}, {
    timestamps: true,

});

const Movies = mongoose.model('movies', moviesSchema);

export default Movies;
