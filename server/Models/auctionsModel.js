import mongoose from "mongoose";


const auctionSchema = new mongoose.Schema({
    banner_image: {
        type: String,
        default: '',
        required: true,
    },
    product_name: {
        type: String,
        default: '',
        required: true,
    },
    description: {
        type: String,
        default: '',
        required: true,
    },
    internal_info: {
        auction_visible: {
            type: Boolean,
            default: false,
            required: true,
        },
        auction_ended: {
            type: Boolean,
            default: false,
            required: true,
        },
        auction_winner: {
            type: String,
            default: '',
            required: true,
        },
        auction_participants: [{
            _id_user: {
                type: String,
                default: '',
                required: true,
            },
            bid: {
                type: Number,
                default: 0,
                required: true,
            },
        }],
    },
    dates: {
        date_auction_created: {
            type: Number,
            default: 0,
            required: true,
        },
        date_auction_started: {
            type: Number,
            default: 0,
            required: true,
        },
        date_auction_ended: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    prices: {
        auction_start_value: {
            type: Number,
            default: 0,
            required: true,
        },
        auction_end_value: {
            type: Number,
            default: 0,
            required: true,
        },
    },
});


const Auctions = mongoose.model('Auctions', auctionSchema);

export default Auctions;
