import User from '../Models/userModel.js';
import { generateToken } from '../Config/jwtConfig.js';

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, role, username, auth, credit_card } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }

        const user = await User.create({
            first_name,
            last_name,
            email,
            role,
            username,
            auth,
            credit_card
        });

        res.status(201).json({ message: 'Utilizador registado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registar utilizador', error: err.message });
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

        console.log('Usuário autenticado, gerando token...');
        const token = generateToken(user);
        console.log('Token gerado:', token);

        res.json({ message: 'Login bem-sucedido', token, user: { username: user.username, role: user.auth.role } });
    } catch (err) {
        console.error('Erro ao realizar login:', err);
        res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
    }
};

export const logout = async(req, res) => {
    res.status(200).json({ message: 'Logout bem-sucedido' });
};