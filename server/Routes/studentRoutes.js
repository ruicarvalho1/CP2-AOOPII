import { Router } from 'express';

import { fileURLToPath } from 'url';

import {
    getAllStudents,
    getStudentById,
    deleteStudent,
    updateStudent,
    createStudent
} from '../Controllers/studentControllers.js';
import * as path from "node:path";

const router = Router();


router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);


router.get('/about', (req, res) => {
res.sendFile(path.resolve('Client/About/about.html'));

});

router.get('/doc', (req, res) => {
    res.sendFile(path.resolve('Client/Documentacao/documentacao.html'));
});

export default router;
