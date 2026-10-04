import axios from 'axios';

/**
 * Base URL resolution:
 *  - VITE_API_URL (build-time) → production / staging API
 *  - Same-origin '/api'       → when Netlify proxies, or in dev with proxy
 *  - localhost:5000           → local dev fallback
 */
const baseURL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? '/api'
    : 'http://localhost:5000/api');

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export const api = {
  list: (params = {}) => client.get('/tasks', { params }).then((r) => r.data),
  get: (id) => client.get(`/tasks/${id}`).then((r) => r.data),
  create: (data) => client.post('/tasks', data).then((r) => r.data),
  update: (id, data) => client.put(`/tasks/${id}`, data).then((r) => r.data),
  remove: (id) => client.delete(`/tasks/${id}`).then((r) => r.data),
};

export default api;