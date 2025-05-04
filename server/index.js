import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import { connectToDatabase } from './ConfigDatabase/databasemongoose.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3002;


app.use(cors({
    origin: 'https://cp2-aoopii-1.onrender.com',
    credentials: true
}));

app.use(express.json());


await connectToDatabase();


app.use('/auth', authRoutes);


server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
