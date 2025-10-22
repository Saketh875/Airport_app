import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUser {
	userId: string;
	role: 'staff' | 'passenger';
}

declare global {
	namespace Express {
		interface Request {
			user?: AuthUser;
		}
	}
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const header = req.headers.authorization;
	if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
	const token = header.slice('Bearer '.length);
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as { sub: string; role: 'staff' | 'passenger' };
		req.user = { userId: decoded.sub, role: decoded.role };
		next();
	} catch (_err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}
