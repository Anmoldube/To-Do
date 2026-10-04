import { useRef, useState } from 'react';
import { CheckIcon, EditIcon, TrashIcon, CalendarIcon, ChevronRightIcon } from './Icons.jsx';
import { fmtTime } from '../utils/date.js';

const PRIORITY_STYLES = {
  High: 'bg-rose-100 text-rose-700 border-rose-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const STATUS_STYLES = {
  Open: 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-indigo-100 text-indigo-700',
  Completed: 'bg-emerald-100 text-emerald-700',
};

export default function TaskItem({ task, onToggleStatus, onEdit, onDelete }) {
  const startX = useRef(null);
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(false);

  const isCompleted = task.status === 'Completed';

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function onTouchMove(e) {
    if (startX.current == null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (dx < 0) setOffset(Math.max(dx, -120));
  }
  function onTouchEnd() {
    if (offset < -60) {
      setOpen(true);
      setOffset(-96);
    } else {
      setOpen(false);
      setOffset(0);
    }
    startX.current = null;
  }

  function onMouseDown(e) {
    startX.current = e.clientX;
    function move(ev) {
      if (startX.current == null) return;
      const dx = ev.clientX - startX.current;
      if (dx < 0) setOffset(Math.max(dx, -120));
    }
    function up() {
      if (offset < -60) {
        setOpen(true);
        setOffset(-96);
      } else {
        setOpen(false);
        setOffset(0);
      }
      startX.current = null;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-card border border-slate-100 task-card-enter">
      {/* Swipe action layer */}
      <div className="absolute inset-y-0 right-0 flex items-stretch">
        <button
          onClick={() => {
            onEdit(task);
            setOpen(false);
            setOffset(0);
          }}
          className="w-12 bg-indigo-500 text-white flex items-center justify-center"
          aria-label="Edit"
        >
          <EditIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="w-12 bg-rose-500 text-white flex items-center justify-center"
          aria-label="Delete"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Foreground card */}
      <div
        className="relative z-10 bg-white p-4 flex items-start gap-3"
        style={{ transform: `translateX(${offset}px)`, transition: offset === 0 ? 'transform 0.2s' : 'none' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <button
          onClick={() => onToggleStatus(task)}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition
            ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'}`}
          aria-label="Toggle complete"
        >
          {isCompleted && <CheckIcon className="w-3.5 h-3.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`text-[15px] font-semibold leading-snug break-words ${
                isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {task.title}
            </h4>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
              }`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className={`mt-1 text-sm line-clamp-2 ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              {new Date(task.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
            <span>{fmtTime(task.date)}</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium ${STATUS_STYLES[task.status] || STATUS_STYLES.Open}`}>
              {task.status}
            </span>
          </div>
        </div>

        <button
          onClick={() => onEdit(task)}
          className="self-center text-slate-300 hover:text-slate-500"
          aria-label="Open"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}