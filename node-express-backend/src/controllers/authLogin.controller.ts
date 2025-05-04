import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = async (
    payload: object,
    secret: string,
    expiresIn: number
): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            { expiresIn },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token!);
                }
            }
        );
    });
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const JWTsecret = process.env.JWT_SECRET_KEY

        // hard coded the authentication for testing purposes
        // In a real application, you would check the credentials against a database
        if (email === 'test@gmail.com' && password === 'Abc@123') {

            // fake payload for testing purposes
            // In a real application, you would get the user ID and role from the database
            const payload = {
                id: '1234567890',
                email: email,
                role: 'admin',
            }
            const jwtToken = await generateToken(payload, JWTsecret!, 3600)

            return res.status(200).json({
                token: jwtToken,
                message: 'Login successfull',
            });
        }
        return res.status(404).json({
            message: 'Login failed',
        });

    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({
            message: 'Login failed',
        });
    }
}