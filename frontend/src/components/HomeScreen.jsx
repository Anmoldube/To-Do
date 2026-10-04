import { useMemo } from 'react';
import { PlusIcon, SearchIcon } from './Icons.jsx';
import Header from './Header.jsx';
import WeekCard from './WeekCard.jsx';
import { groupByWeek } from '../utils/date.js';

export default function HomeScreen({
  tasks,
  loading,
  error,
  onToggleStatus,
  onEdit,
  onDelete,
  onAdd,
  onSearchClick,
}) {
  const weeks = useMemo(() => groupByWeek(tasks), [tasks]);
  const totalOpen = tasks.filter((t) => t.status !== 'Completed').length;
  const totalDone = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
      <Header
        title="Your week, organised"
        subtitle={`${totalOpen} open · ${totalDone} done`}
        rightSlot={
          <button
            onClick={onSearchClick}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 py-4 space-y-3">
        {loading && (
          <div className="text-center text-slate-400 py-12 text-sm">Loading tasks…</div>
        )}
        {error && (
          <div className="text-center text-rose-600 bg-rose-50 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        {!loading && weeks.length === 0 && (
          <EmptyState onAdd={onAdd} />
        )}
        {weeks.map((w) => (
          <WeekCard
            key={w.start.toISOString()}
            week={w}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
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

function EmptyState({ onAdd }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-4">
        <PlusIcon className="w-10 h-10 text-indigo-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800">No tasks yet</h3>
      <p className="text-sm text-slate-500 mt-1 mb-5">
        Start by adding your first task — keep it small to keep momentum.
      </p>
      <button
        onClick={onAdd}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-fab"
      >
        Add a task
      </button>
    </div>
  );
}