import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../utils/api.js';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.list();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(async (payload) => {
    const created = await api.create(payload);
    setTasks((prev) => [...prev, created]);
    return created;
  }, []);

  const update = useCallback(async (id, payload) => {
    const updated = await api.update(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await api.remove(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }, []);

  return useMemo(
    () => ({ tasks, loading, error, refresh, create, update, remove }),
    [tasks, loading, error, refresh, create, update, remove]
  );
}