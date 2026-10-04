import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from './Icons.jsx';
import { fmtRange, isThisWeek } from '../utils/date.js';
import TaskItem from './TaskItem.jsx';

export default function WeekCard({ week, onToggleStatus, onEdit, onDelete }) {
  const [open, setOpen] = useState(isThisWeek(week.start));
  const completed = week.tasks.filter((t) => t.status === 'Completed').length;
  const open_ = week.tasks.length - completed;
  const completionPct = week.tasks.length === 0 ? 0 : Math.round((completed / week.tasks.length) * 100);

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full p-4 text-left flex items-center gap-3 active:scale-[0.99] transition"
      >
        <div
          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center text-white text-[10px] font-semibold
            ${isThisWeek(week.start) ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}
        >
          <span className="leading-none text-base">
            {week.start.getDate()}
          </span>
          <span className="leading-none mt-0.5">
            {week.start.toLocaleString('en-US', { month: 'short' })}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800 text-sm">
              {fmtRange(week.start, week.end)}
            </h3>
            {isThisWeek(week.start) && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">
                This week
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-slate-600 font-medium">{open_} open</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-600 font-medium">{completed} done</span>
            </span>
            <span className="text-slate-400 ml-auto">{completionPct}%</span>
          </div>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        <div className="text-slate-400">
          {open ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
        </div>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2 animate-fade-in">
          {week.tasks.length === 0 ? (
            <div className="text-center text-slate-400 text-sm py-6">
              No tasks for this week.
            </div>
          ) : (
            week.tasks
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
      )}
    </div>
  );
}