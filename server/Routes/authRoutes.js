import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleWare.js';
import {getProfile} from "../Controllers/UserController.js";



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);

export default router;