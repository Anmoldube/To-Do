import { getRepo } from '../repositories/index.js';

/* ------------------------------------------------------------------ */
/* CRUD — controller only handles HTTP concerns (parse, respond, error)*/
/* All storage logic lives in the repository layer.                    */
/* ------------------------------------------------------------------ */

export async function listTasks(req, res, next) {
  try {
    const tasks = await getRepo().list(req.query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function getTask(req, res, next) {
  try {
    const task = await getRepo().findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description = '', date, status = 'Open', priority = 'Medium' } = req.body;
    if (!title || !date) {
      return res.status(400).json({ error: 'Title and date are required' });
    }
    const created = await getRepo().create({ title, description, date, status, priority });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    const updated = await getRepo().update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const deleted = await getRepo().delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ ok: true, id: req.params.id });
  } catch (err) {
    next(err);
  }
}