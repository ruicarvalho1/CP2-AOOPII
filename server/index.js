import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors'; // Importando o pacote cors
import { WebSocketServer } from 'ws';
import authRoutes from './Routes/authRoutes.js';
import { handleConnection } from './Controllers/auctionController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(cors({
    origin: 'https://project-assignment-2-27638-27628-27643.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para JSON
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas REST
app.use('/auth', authRoutes);

// Configuração do WebSocket
console.log("Configurando WebSocket...");

const wss = new WebSocketServer({
    server,
    path: '/ws/auction/live',
    verifyClient: (info, callback) => {
        console.log(`Tentativa de conexão WebSocket detectada.`);
        console.log(`Origem: ${info.origin}`);
        console.log(`Caminho: ${info.req?.url || 'Desconhecido'}`);
        callback(true); // Permitir todas as conexões
        console.log("Conexão permitida pelo verifyClient.");
    },
});

console.log("WebSocketServer configurado com sucesso.");

wss.on('connection', (socket, req) => {
    console.log("Evento de conexão WebSocket disparado.");
    console.log(`Nova conexão recebida.`);
    console.log(`Origem: ${req.headers.origin || 'Desconhecida'}`);
    console.log(`Endereço remoto: ${req.socket.remoteAddress || 'Desconhecido'}`);

    // Log para acompanhamento da chamada do handler
    console.log("Chamando handleConnection...");
    handleConnection(socket, wss, req);
    console.log("handleConnection executado com sucesso.");
});

wss.on('error', (err) => {
    console.error("Erro no WebSocketServer:", err);
});

wss.on('close', () => {
    console.log("WebSocketServer encerrado.");
});

console.log("Eventos do WebSocketServer configurados.");

// Inicia o servidor HTTP
server.listen(port, () => {
    console.log(`Servidor HTTP disponível em: https://project-assignment-2-27638-27628-27643-3dd5.onrender.com`);
    console.log(`WebSockets disponíveis em: wss://project-assignment-2-27638-27628-27643-3dd5.onrender.com/ws/auction/live`);
});
