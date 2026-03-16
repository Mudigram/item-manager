import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import itemRoutes from './routes/items';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (_req, res) => res.send('Item Manager API running'));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));