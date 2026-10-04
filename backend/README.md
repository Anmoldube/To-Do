# Backend

```bash
npm install
cp .env.example .env       # optional — set MONGODB_URI for persistence
npm run dev                # http://localhost:5000/api/tasks
```

- `MONGODB_URI` set → uses MongoDB
- unset → uses `data/store.json` (auto-created)

Health check: `GET /api/health`