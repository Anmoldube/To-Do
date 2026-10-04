import { useEffect, useMemo, useState } from 'react';
import api from '../utils/api.js';
import Header from './Header.jsx';
import { SearchIcon, CloseIcon } from './Icons.jsx';
import TaskItem from './TaskItem.jsx';

export default function SearchScreen({ onEdit, onDelete, onToggleStatus }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const data = await api.list({ q: term });
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const placeholder = useMemo(
    () => 'Search by title or description…',
    []
  );

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
      <Header title="Search tasks" subtitle="Find anything across your list" />

      <div className="px-4 py-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
          />
          {q && (
            <button
              onClick={() => setQ('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700"
              aria-label="Clear"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {q.trim() === '' && (
            <div className="text-center text-slate-400 py-16 text-sm">
              Type to search across all your tasks.
            </div>
          )}
          {q.trim() !== '' && loading && (
            <div className="text-center text-slate-400 py-8 text-sm">Searching…</div>
          )}
          {q.trim() !== '' && !loading && results.length === 0 && (
            <div className="text-center text-slate-400 py-8 text-sm">
              No tasks match “{q}”.
            </div>
          )}
          {results.map((t) => (
            <TaskItem
              key={t._id}
              task={t}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}