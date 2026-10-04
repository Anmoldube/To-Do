/**
 * File-backed JSON store. Used when MONGODB_URI is not set so the API
 * still runs out of the box on a fresh clone.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, '..', 'data', 'store.json');

function ensureFile() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(STORE_PATH)) fs.writeFileSync(STORE_PATH, '[]', 'utf-8');
}

export function readAll() {
  ensureFile();
  const txt = fs.readFileSync(STORE_PATH, 'utf-8') || '[]';
  try {
    return JSON.parse(txt);
  } catch {
    return [];
  }
}

export function writeAll(rows) {
  ensureFile();
  fs.writeFileSync(STORE_PATH, JSON.stringify(rows, null, 2), 'utf-8');
}