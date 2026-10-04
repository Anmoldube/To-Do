import { useMemo, useState } from 'react';
import Header from './Header.jsx';
import TaskItem from './TaskItem.jsx';
import { PlusIcon } from './Icons.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Open', label: 'Open' },
  { id: 'In Progress', label: 'In progress' },
  { id: 'Completed', label: 'Done' },
];

export default function AllTasksScreen({ tasks, onToggleStatus, onEdit, onDelete, onAdd }) {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
      <Header title="All tasks" subtitle={`${tasks.length} total`} />

      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 whitespace-nowrap transition
                ${active
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="px-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center text-slate-400 py-16 text-sm">
            Nothing here yet.
          </div>
        ) : (
          filtered
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((t) => (
              <TaskItem
                key={t._id}
                task={t}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
        )}
      </div>

      <button
        onClick={onAdd}
        className="fixed bottom-20 right-5 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-fab flex items-center justify-center hover:scale-105 active:scale-95 transition"
        aria-label="Add task"
      >
        <PlusIcon className="w-7 h-7" />
      </button>
    </div>
  );
}