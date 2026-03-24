import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/db';
import protect, { AuthRequest } from '../middleware/auth';

const router = Router();
router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const search = (req.query.search as string) || '';

        const result = await pool.query(
            `SELECT items.*, users.username
             FROM items
             JOIN users ON items.user_id = users.id
             WHERE items.name ILIKE $1 OR items.description ILIKE $2
             ORDER BY items.created_at DESC`,
            [`%${search}%`, `%${search}%`]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: (err as Error).message });
    }
});

router.post(
    '/',
    protect,
    [
        body('name').notEmpty().withMessage('Name is required').isLength({ max: 150 }),
        body('description').optional().isString(),
    ],
    async (req: AuthRequest, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name, description } = req.body as { name: string; description?: string };

        try {
            const result = await pool.query(
                'INSERT INTO items (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
                [name, description || '', req.user!.id]
            );

            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: (err as Error).message });
        }
    }
);

export default router;