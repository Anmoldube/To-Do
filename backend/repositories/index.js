/**
 * Repository factory — the ONE place that decides which storage adapter to use.
 *
 * To add a new storage backend (e.g. Redis, PostgreSQL):
 *   1. Create a new class that extends ITaskRepository
 *   2. Add an `else if` branch here
 *   3. Touch nothing else
 */
import { MongoTaskRepository } from './MongoTaskRepository.js';
import { JsonTaskRepository } from './JsonTaskRepository.js';

let _instance = null;

export function getRepo() {
  if (_instance) return _instance;
  _instance = process.env.MONGODB_URI
    ? new MongoTaskRepository()
    : new JsonTaskRepository();
  return _instance;
}
