import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    storage: MONGODB_URI ? 'mongodb' : 'memory',
    time: new Date().toISOString(),
  });
});

app.use('/api/tasks', tasksRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

async function start() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection failed, falling back to memory store');
      console.error(err.message);
    }
  } else {
    console.log('ℹ️  No MONGODB_URI — using in-memory JSON store at backend/data/store.json');
  }
  app.listen(PORT, () => {
    console.log(`🚀 API ready at http://localhost:${PORT}/api/tasks`);
  });
}

start();
