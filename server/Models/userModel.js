import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    auth: {
        platform: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    credit_card: {
        type: String,
        required: true
    },
    image_profile: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-default-avatar-profile-icon-grey-photo-placeholder-99724602.jpg',
    },
    account_creation_date: {
        type: Date,
        default: Date.now
    },
    previous_auctions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    }],
    won_auctions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    }]
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('auth.password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.auth.password = await bcrypt.hash(this.auth.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.auth.password);
    } catch (error) {
        throw new Error('Erro ao comparar as senhas');
    }
};


const User = mongoose.model('User', userSchema);

export default User;
