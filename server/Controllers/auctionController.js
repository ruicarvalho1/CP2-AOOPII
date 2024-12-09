import { WebSocketServer } from 'ws';
import {encryptId, decryptId} from '../middlewares/encryptDecryptData.js'
let wss;
import { z } from 'zod';

const objectMongoRegex = /^[a-fA-F0-9]{24}$/;
const hexadecimalRegex = /^[0-9a-fA-F]+$/;

const auctionSchema = z.object({
    banner_image: z.string().default(''),
    product_name: z.string().default(''),
    description: z.string().default(''),
    internal_info: z.object({
        auction_visible: z.boolean().default(false),
        auction_ended: z.boolean().default(false),
        auction_winner: z.string().default(''),
        auction_participants: z.array(
            z.object({
                _id_user: z.string().default(''),
                bid: z.number().default(0),
            })
        ),
    }),
    dates: z.object({
        date_auction_created: z.number().default(0),
        date_auction_started: z.number().default(0),
        date_auction_ended: z.number().default(0),
    }),
    prices: z.object({
        auction_start_value: z.number().default(0),
        auction_end_value: z.number().default(0),
    }),
});

// For info already decrypted
const AuctionGetNewBidSchema = (minBidValue) => {
    return z.object({
        auction_id: z.string().regex(objectMongoRegex,"Invalid data"),
        user_id: z.string().regex(objectMongoRegex,"Invalid data"),
        bid: z.number().min(minBidValue, { message: `Bid must be greater than or equal to ${minBidValue}` }) // Dynamic minimum bid value
    });
};


// For info already encrypted
const AuctionSendBidSchema = (minBidValue) => {
    return z.object({
        auction_id: z.string().regex(hexadecimalRegex,"Invalid data"),
        user_id: z.string().regex(hexadecimalRegex,"Invalid data"),
        bid: z.number().min(minBidValue, { message: `Bid must be greater than or equal to ${minBidValue}` }) // Dynamic minimum bid value
    });
};























const initializeSocket = (server) => {
    wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.send('WebSocket connected successfully!');

        ws.on('message', (message) => {
            console.log('Received: %s', message);
            ws.send('Message received successfully!');
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

const sendMessageTest = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
    console.log("Message sent to all connected clients");
};

const connectWebSocket = () => {
    sendMessageTest('WebSocket connected successfully!');
};

const placeBid = (bid, userId) => {
    sendMessageTest(`New bid placed: ${bid} by user: ${userId}`);
};

const auctionStart = (bid, userId, ) => {}

export { initializeSocket, sendMessageTest, connectWebSocket, placeBid };
