import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './server/config/db.js';
import authRoutes from './server/routes/authRoutes.js';
import contactRoutes from './server/routes/contactRoutes.js';
import materialRoutes from './server/routes/materialRoutes.js';
import { notFound, errorHandler } from './server/middleware/errorMiddleware.js';

// Init dotenv configuration
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Establish Connection to Database (MongoDB or falling back to local JSON)
  await connectDB();

  // Middleware setups
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route declarations
  app.use('/api/auth', authRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/materials', materialRoutes);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      time: new Date().toISOString(),
      database: process.env.MONGO_URI ? 'mongodb_atlas' : 'local_json_db'
    });
  });

  // Vite middleware setup for asset rendering
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Serve client index.html for React router support
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use(notFound as any);
  app.use(errorHandler as any);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CSIT Info Portal running on http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

// Start full stack server
startServer().catch((error) => {
  console.error('Fatal Server Boot Error:', error);
});
