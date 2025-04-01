import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import analyzeRoutes from './routes/analyzeRoutes.js';


const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', analyzeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));