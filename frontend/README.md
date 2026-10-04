# Frontend

```bash
npm install
npm run dev                # http://localhost:5173
npm run build              # production build → dist/
```

Optional env: create `.env` and set
```
VITE_API_URL=https://your-api.example.com/api
```

If unset, the client talks to `http://localhost:5000/api` in dev and falls back to the same-origin `/api` path in production (configure your Netlify proxy if needed).