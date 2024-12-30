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
import {handleAdminConnection, handleUserConnection, auctionEnded} from "../Controllers/auctionController.js"


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
router.get('/home', authenticate, authorize(['user', 'admin']));

/*Auction routes*/

router.get("/auction/live/user", authenticate,authorize(['user']),handleUserConnection)
router.get("/auction/live/admin",authenticate, authorize(['admin']), handleAdminConnection)
router.put('/auction/:id/end', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await auctionEnded(id);
        if (!result) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }
        res.status(200).json({ message: 'Leilão finalizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao finalizar o leilão', error: error.message });
    }
});

export default router;
