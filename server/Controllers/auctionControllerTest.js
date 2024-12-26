const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const Auction = require('./models/auction'); // Modelo do Leilão
const { z } = require('zod');

// Função para verificar o JWT e garantir que o admin está logado
function verifyAdminJWT(token) {
    try {
        const decoded = jwt.verify(token, 'my_secret_key');  // Segredo do JWT
        if (decoded.role !== 'admin') {
            throw new Error('Apenas administradores podem acessar este servidor.');
        }
        return decoded;
    } catch (error) {
        throw new Error('Token inválido ou expirado.');
    }
}

// Função para verificar o JWT e garantir que o usuário está logado
function verifyUserJWT(token) {
    try {
        const decoded = jwt.verify(token, 'my_secret_key');  // Segredo do JWT
        if (decoded.role !== 'user') {
            throw new Error('Apenas usuários podem fazer lances.');
        }
        return decoded;
    } catch (error) {
        throw new Error('Token inválido ou expirado.');
    }
}

// Função para processar lances
async function processBid(auction_id, user_id, bid, socket) {
    const auction = await Auction.findOne({ auction_id });

    if (!auction) {
        return socket.send(JSON.stringify({ type: 'error', message: 'Leilão não encontrado' }));
    }

    if (auction.internal_info.auction_ended) {
        return socket.send(JSON.stringify({ type: 'error', message: 'O leilão já terminou' }));
    }

    if (bid > auction.prices.auction_end_value) {
        auction.prices.auction_end_value = bid;
        auction.internal_info.auction_winner = user_id;
        await auction.save();
        broadcastMessage({
            auction_id,
            highestBid: auction.prices.auction_end_value,
            highestBidder: auction.internal_info.auction_winner,
            auctionData: auction
        });
    } else {
        return socket.send(JSON.stringify({ type: 'error', message: 'O lance deve ser maior que o lance atual' }));
    }
}

// Função para enviar mensagens para todos os clientes conectados
function broadcastMessage(message) {
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// Função para o Admin conectar-se e gerenciar o leilão
function handleAdminConnection(socket, req) {
    let token = req.headers['authorization']; // Token do JWT enviado nos cabeçalhos
    if (!token) {
        socket.send(JSON.stringify({ type: 'error', message: 'Token necessário.' }));
        socket.close();
        return;
    }

    try {
        const adminData = verifyAdminJWT(token);
        console.log('Admin conectado:', adminData);

        socket.on('message', (message) => {
            const parsedMessage = JSON.parse(message);
            const { auction_id, user_id, bid } = parsedMessage;

            // Processa o lance do admin (admin pode manipular lances)
            processBid(auction_id, user_id, bid, socket);
        });

        socket.on('close', () => {
            console.log('Admin desconectado.');
        });
    } catch (error) {
        socket.send(JSON.stringify({ type: 'error', message: error.message }));
        socket.close();
    }
}

// Função para o User conectar-se e apenas fazer lances
function handleUserConnection(socket, req) {
    let token = req.headers['authorization']; // Token do JWT enviado nos cabeçalhos
    if (!token) {
        socket.send(JSON.stringify({ type: 'error', message: 'Token necessário.' }));
        socket.close();
        return;
    }

    try {
        const userData = verifyUserJWT(token);
        console.log('Usuário conectado:', userData);

        socket.on('message', (message) => {
            const parsedMessage = JSON.parse(message);
            const { auction_id, user_id, bid } = parsedMessage;

            // O usuário só pode fazer lances, então processa apenas lances
            processBid(auction_id, user_id, bid, socket);
        });

        socket.on('close', () => {
            console.log('Usuário desconectado.');
        });
    } catch (error) {
        socket.send(JSON.stringify({ type: 'error', message: error.message }));
        socket.close();
    }
}

// Função para iniciar o servidor WebSocket
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket, req) => {
    const url = req.url || '';

    // Verifica se o cliente é admin ou usuário
    if (url.includes('/admin')) {
        handleAdminConnection(socket, req);
    } else if (url.includes('/user')) {
        handleUserConnection(socket, req);
    } else {
        socket.send(JSON.stringify({ type: 'error', message: 'Acesso não permitido.' }));
        socket.close();
    }
});

// Função para iniciar o servidor WebSocket e expor as funções
function startServer() {
    console.log('Servidor WebSocket está rodando na porta 8080');
}

// Função para permitir que os usuários se conectem
function joinAuction(userId, auctionId) {
    // Função para simular a junção de um leilão, podendo ser adaptada para a lógica específica de usuários
    console.log(`${userId} entrou no leilão ${auctionId}`);
}

// Exportar as funções
module.exports = {
    startServer,
    joinAuction
};
