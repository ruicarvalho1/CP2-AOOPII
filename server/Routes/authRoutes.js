import express from 'express';
import {register, login, logout} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleWare.js';
import {getProfile, updateProfile} from "../Controllers/userController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',authenticate,logout);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/home', authenticate);

export default router;