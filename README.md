# 📝 To-Do List — MERN Stack

A clean, fully responsive mobile-first To-Do app built with **MongoDB, Express, React (Vite), and Node.js**, styled with **Tailwind CSS**.

> Weeks run **Monday → Sunday**. The home screen shows week cards with **open vs. completed** counts and a progress bar. Tap a card to expand its tasks. **Swipe a task left** to reveal **edit / delete** actions. **Tap the check-circle** to toggle completion.

---

## ✨ Features

- ✅ Create / edit / delete tasks (title, description, date & time, priority)
- 🎯 Priority levels: **Low / Medium / High**
- 🔁 Status: **Open / In Progress / Completed**
- 🗓 Home screen groups tasks **by week** (Mon–Sun) with open vs. closed counts
- 🔍 Live search across title & description
- 👆 **Swipe-to-delete** UI (touch + mouse fallback) and tap-to-toggle
- 📱 **Mobile-first** design (works great on desktop too — centered 480px shell)
- 💾 Persists to **MongoDB** in production; falls back to a **JSON file store** locally

---

## 🧱 Project layout

```
todo-app/
├── backend/          # Express API (Node 18+)
│   ├── controllers/
│   ├── repositories/      # Mongoose Task schema
│   ├── routes/
│   ├── data/         # JSON fallback store
│   ├── server.js
│   └── .env.example
└── frontend/         # React + Vite + Tailwind
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── netlify.toml
    └── vite.config.js
```

---

## 🚀 Run locally

### 1. Backend (port 5000)

```bash
cd backend
cp .env.example .env       # optional: set MONGODB_URI to your Atlas cluster
npm install
npm run dev
```

Without `MONGODB_URI`, the API uses `backend/data/store.json` so it works out of the box.

```bash
curl http://localhost:5000/api/health
# → { "ok": true, "storage": "memory" | "mongodb", ... }
```

### 2. Frontend (port 5173)

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. The frontend proxies API calls to `http://localhost:5000/api` automatically.

---

## ☁️ Deploy

### Frontend → Netlify (recommended)

1. Push this repo to GitHub.
2. On Netlify → **Add new site → Import from Git** → pick the repo.
3. Netlify auto-detects `frontend/netlify.toml`, so:
   - **Base directory:** `frontend` (already in `netlify.toml`)
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `frontend/dist`
4. (Optional) Set env var `VITE_API_URL` to your deployed backend URL, e.g. `https://your-api.onrender.com/api`.

### Backend → Render / Railway / Fly

1. Create a new Web Service pointing at the `backend/` folder.
2. **Build command:** `npm install`
3. **Start command:** `npm start`
4. Set `MONGODB_URI` to your Atlas connection string.
5. Set `PORT` if your host needs it.

---

## 🔌 API reference

Base: `/api/tasks`

| Method | Path             | Body                                                                                       | Description                  |
| ------ | ---------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| GET    | `/api/tasks`     | — (query: `q`, `status`, `priority`)                                                       | List / search tasks          |
| GET    | `/api/tasks/:id` | —                                                                                          | Get one                      |
| POST   | `/api/tasks`     | `{ title, description?, date, priority?, status? }`                                        | Create                       |
| PUT    | `/api/tasks/:id` | partial task                                                                               | Update                       |
| PATCH  | `/api/tasks/:id` | partial task                                                                               | Update (alias)               |
| DELETE | `/api/tasks/:id` | —                                                                                          | Delete                       |

`date` accepts an ISO 8601 string. `priority` ∈ {`Low`, `Medium`, `High`}. `status` ∈ {`Open`, `In Progress`, `Completed`}.

---

## 🧪 Smoke test

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Read spec","description":"SDE-1 MERN brief","date":"2026-10-05T10:00:00Z","priority":"High"}'
```

---

## 📦 Tech stack

- **Frontend:** React 18, Vite 5, Tailwind 3, Axios
- **Backend:** Node 18+, Express 4, Mongoose 8, Morgan, CORS, dotenv
- **Storage:** MongoDB (prod) or JSON file (dev)

---

## 📤 Submit

Push the repo to GitHub, then (optionally) deploy the frontend to Netlify and the backend to Render. Drop the URLs in your submission.

Happy shipping 🚀