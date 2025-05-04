import { Request, Response, NextFunction } from 'express';

const INTERNAL_AUTH_TOKEN = process.env.INTERNAL_COMUNICATION_API_KEY || null;

export function internalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    // Check if the token is the internal auth token
    if (!token || !INTERNAL_AUTH_TOKEN || token !== INTERNAL_AUTH_TOKEN ) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    next();
}
