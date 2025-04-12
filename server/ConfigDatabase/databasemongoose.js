import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const mongoDB = process.env.MONGO_URI;




export const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
