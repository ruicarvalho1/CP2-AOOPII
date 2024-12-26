import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { initializeSocket } from './Controllers/auctionController.js';
import authRoutes from './routes/authRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Permitir o frontend na porta 5173
    credentials: true, // Habilitar o envio de cookies e tokens de autenticação
}));


app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

initializeSocket(server);

app.use('/auth', authRoutes);
app.use('/socket/auction', auctionRoutes);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
