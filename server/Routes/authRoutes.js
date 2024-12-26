import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleWare.js';
import { register, login, logout } from '../controllers/authController.js';
import { getProfile, updateProfile } from "../Controllers/userController.js";
import {getAuctions, updateAuction} from "../Controllers/auctionsController.js";

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);


router.get('/profile', authenticate, authorize(['user', 'admin']), getProfile);
router.put('/profile', authenticate, authorize(['user', 'admin']), updateProfile);
router.get('/dashboard', authenticate, authorize(['admin']), getAuctions);
router.get('/auctions', authenticate, authorize(['user','admin']), getAuctions);
router.put('/auctions', authenticate, authorize(['admin']), updateAuction);
router.get('/home', authenticate, authorize(['user', 'admin']));

export default router;
