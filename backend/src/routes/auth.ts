import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User';

const router = Router();

router.post('/register', async (req, res) => {
	try {
		const { name, email, password, role } = req.body as { name: string; email: string; password: string; role: UserRole };
		if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
		const existing = await User.findOne({ email });
		if (existing) return res.status(409).json({ message: 'Email already in use' });
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, passwordHash, role });
		res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
	} catch (err) {
		res.status(500).json({ message: 'Registration failed' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body as { email: string; password: string };
		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });
		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
		const token = jwt.sign({ sub: String(user._id), role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '12h' });
		res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
	} catch (err) {
		res.status(500).json({ message: 'Login failed' });
	}
});

export default router;
