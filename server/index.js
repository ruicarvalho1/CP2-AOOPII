import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { WebSocketServer } from 'ws';
import authRoutes from "./Routes/authRoutes.js";
import auctionRoutes from './Routes/auctionRoutes.js'; // Rotas REST
import { handleAdminConnection, handleUserConnection } from './Controllers/auctionController.js'; // WebSocket Handlers

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// Middleware para JSON
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/auth',authRoutes )

app.use('/api', auctionRoutes);

// Configuração do WebSocket
const wss = new WebSocketServer({ server, path: '/auction/live' });

wss.on('connection', (socket, req) => {
    const url = req.url || '';
    if (url.includes('admin')) {
        handleAdminConnection(socket, wss, req);
    } else if (url.includes('user')) {
        handleUserConnection(socket, wss, req);
    } else {
        console.log('Conexão WebSocket sem tipo especificado');
        socket.close(); // Fecha a conexão se não é reconhecida
    }
});

// Inicia o servidor HTTP
server.listen(port, () => {
    console.log(`Servidor a correr em: https://project-assignment-2-27638-27628-27643-3dd5.onrender.com`);
    console.log(`WebSockets disponíveis em: wss://project-assignment-2-27638-27628-27643-3dd5.onrender.com/api/auction/live`);
});

