import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TimeWise Core API',
    version: '1.0.0',
    time: new Date().toISOString()
  });
});

// Main API Router
app.use('/api', apiRouter);

// Centralized error handling
app.use(errorHandler);

