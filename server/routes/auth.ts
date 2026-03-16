import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import pool from '../config/db';

const router = Router();

router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { username, email, password } = req.body as {
            username: string;
            email: string;
            password: string;
        };

        try {

            const [existing] = await pool.query(
                'SELECT id FROM users WHERE email = ? OR username = ?',
                [email, username]
            );

            if ((existing as any[]).length > 0) {
                res.status(400).json({ message: 'Email or username already taken' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await pool.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            ) as any;

            const token = jwt.sign(
                { id: result.insertId, username },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                token,
                user: { id: result.insertId, username, email },
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: (err as Error).message });
        }
    }
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body as { email: string; password: string };

        try {
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            const userList = users as any[];


            if (userList.length === 0) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }

            const user = userList[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            res.json({
                token,
                user: { id: user.id, username: user.username, email: user.email },
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: (err as Error).message });
        }
    }
);

export default router;