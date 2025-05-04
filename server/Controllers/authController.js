import User from '../Models/User.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ message: 'Username already exists' });

        const user = await User.create({ username, password });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, username: user.username },
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, username: user.username },
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

export const logoutUser = async (req, res) => {
    return res.status(200).json({ message: 'User logged out successfully' });
};

