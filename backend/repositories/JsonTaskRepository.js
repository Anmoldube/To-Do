import mongoose from 'mongoose';
import { readAll, writeAll } from '../data/store.js';
import { ITaskRepository } from './ITaskRepository.js';

export class JsonTaskRepository extends ITaskRepository {
  async list({ q, status, priority } = {}) {
    let rows = readAll();

    if (status && ['Open', 'In Progress', 'Completed'].includes(status)) {
      rows = rows.filter((t) => t.status === status);
    }
    if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
      rows = rows.filter((t) => t.priority === priority);
    }
    if (q && q.trim()) {
      const re = new RegExp(q.trim(), 'i');
      rows = rows.filter((t) => re.test(t.title) || re.test(t.description || ''));
    }

    return rows
      .slice()
      .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
  }

  async findById(id) {
    const all = readAll();
    return all.find((t) => t._id === id) ?? null;
  }

  async create(payload) {
    const all = readAll();
    const newTask = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    all.push(newTask);
    writeAll(all);
    return newTask;
  }

  async update(id, data) {
    const all = readAll();
    const idx = all.findIndex((t) => t._id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    writeAll(all);
    return all[idx];
  }

  async delete(id) {
    const all = readAll();
    const idx = all.findIndex((t) => t._id === id);
    if (idx === -1) return null;
    const [deleted] = all.splice(idx, 1);
    writeAll(all);
    return deleted;
  }
}
