import User from '../models/UserModel.js';
import { generateToken } from '../config/jwtConfig.js';


export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, role, username, auth, credit_card } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }

        // Criação do novo usuário
        const user = await User.create({
            first_name,
            last_name,
            email,
            role,
            username,
            auth,
            credit_card
        });

        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
    }
};



export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const token = generateToken(user);

        res.json({ message: 'Login bem-sucedido', token, user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
    }
};
