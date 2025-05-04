import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || '';

// Extend the Request interface to include the `user` property
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
   
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload; // Explicitly cast to JwtPayload
        req.user = decoded; // Attach decoded token payload to the request object
        next();
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
