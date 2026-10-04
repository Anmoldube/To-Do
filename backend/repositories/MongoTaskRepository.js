import Task from '../models/Task.js';
import { ITaskRepository } from './ITaskRepository.js';

export class MongoTaskRepository extends ITaskRepository {
  async list({ q, status, priority } = {}) {
    const filter = {};

    if (status && ['Open', 'In Progress', 'Completed'].includes(status)) {
      filter.status = status;
    }
    if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
      filter.priority = priority;
    }
    if (q && q.trim()) {
      const re = new RegExp(q.trim(), 'i');
      filter.$or = [{ title: re }, { description: re }];
    }

    return Task.find(filter).sort({ date: 1 });
  }

  async findById(id) {
    return Task.findById(id);
  }

  async create(payload) {
    return Task.create(payload);
  }

  async update(id, data) {
    return Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return Task.findByIdAndDelete(id);
  }
}
