import { Router } from 'express';
import path from "node:path";

const router1 = Router();


router1.get('/about', (req, res) => {
    res.sendFile(path.resolve('Client/About/about.html'));

});

router1.get('/doc', (req, res) => {
    res.sendFile(path.resolve('Client/Documentacao/documentacao.html'));
});


export default router1;