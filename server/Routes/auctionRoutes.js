import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleWare.js'; // Middleware de autenticação/autorização
import { handleUserConnection, handleAdminConnection, auctionEnded } from '../Controllers/auctionController.js'; // WebSocket Handlers

const router = express.Router();

// Rota WebSocket para usuários
router.get("/auction/live/user", authenticate, authorize(['user']), handleUserConnection);

// Rota WebSocket para admins
router.get("/auction/live/admin", authenticate, authorize(['admin']), handleAdminConnection);

// Finalizar um leilão (apenas admin)
router.put('/auction/:id/end', authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await auctionEnded(id);
        if (!result) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }
        res.status(200).json({ message: 'Leilão encerrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao finalizar o leilão', error: error.message });
    }
});


export default router;
