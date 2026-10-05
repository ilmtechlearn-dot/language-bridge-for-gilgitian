import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './server/db/connection';
import { initDatabase } from './server/db/store';

// Route imports
import authRoutes from './server/routes/auth';
import translateRoutes from './server/routes/translate';
import phrasesRoutes from './server/routes/phrases';
import historyRoutes from './server/routes/history';
import favouritesRoutes from './server/routes/favourites';
import requestsRoutes from './server/routes/requests';
import reportsRoutes from './server/routes/reports';
import feedbackRoutes from './server/routes/feedback';
import adminRoutes from './server/routes/admin';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security & JSON middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger for API endpoints
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/translate-ai', translateRoutes);
app.use('/api/phrases', phrasesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/translation-requests', requestsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Gilgit Language Bridge API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  // Connect DB and seed
  await connectDB();
  await initDatabase();

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Mount Vite dev server in middleware mode
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Dev] Vite middleware attached for hot development');
  } else {
    // In production, serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Server Error]', err);
    res.status(err.status || 500).json({
      error: err.message || 'An unexpected server error occurred.',
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Gilgit Language Bridge] Full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot failure:', err);
  process.exit(1);
});
