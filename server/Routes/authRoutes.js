import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleWare.js';
import { register, login, logout } from '../controllers/authController.js';
import { getProfile, updateProfile } from "../Controllers/userController.js";
import {
    createAuction,
    deleteAuction,
    getAuctionById,
    getAuctionsAdmin, getAuctionsUser, getHistoryAuctions,
    updateAuction
} from "../Controllers/auctionsController.js";

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);


router.get('/profile', authenticate, authorize(['user', 'admin']), getProfile);
router.put('/profile', authenticate, authorize(['user', 'admin']), updateProfile);
router.get('/dashboard', authenticate, authorize(['admin']), getAuctionsAdmin);
router.get('/auctions-admin', authenticate, authorize(['admin']), getAuctionsAdmin);
router.get('/auctions', authenticate, authorize(['user']), getAuctionsUser);
router.get('/auctions/:id', authenticate, authorize(['user', 'admin']),getAuctionById);
router.post('/auctions', authenticate, authorize(['admin']), createAuction);
router.put('/auctions/:id', authenticate, authorize(['admin']), updateAuction);
router.delete('/auctions/:id', authenticate, authorize(['admin']), deleteAuction);
router.get('/historyauctions', getHistoryAuctions);
router.put('/auctions', authenticate, authorize(['admin']), updateAuction);
router.get('/home', authenticate, authorize(['user', 'admin']));

export default router;
