import express from 'express';
import { connectWebSocket, placeBid, sendMessageTest } from '../Controllers/auctionController.js';

const auctionRoutes = express.Router();

auctionRoutes.get('/test', (req, res) => {
    res.send('API and WebSocket are active.');
});

auctionRoutes.get('/connect', (req, res) => {
    connectWebSocket();
    res.status(200).send({ message: 'WebSocket triggered successfully!' });
});

auctionRoutes.post('/bid', (req, res) => {
    const { bid, userId } = req.body;
    placeBid(bid, userId);
    res.status(200).send({ message: 'Bid received successfully!' });
});

auctionRoutes.post('/send-message', (req, res) => {
    const { message } = req.body;
    sendMessageTest(message);
    res.status(200).send({ message: 'Message sent successfully!' });
});

export default auctionRoutes;
