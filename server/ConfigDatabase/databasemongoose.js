import mongoose from 'mongoose';

const mongoDB = 'mongodb://localhost/studentsdb';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
