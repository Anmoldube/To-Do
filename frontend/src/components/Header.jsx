import { useMemo } from 'react';

export default function Header({ title, subtitle, rightSlot }) {
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  return (
    <div className="px-5 pt-6 pb-4 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/70">
            {today}
          </p>
          <h1 className="text-2xl font-extrabold mt-1 leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-white/80 mt-1">{subtitle}</p>
          )}
        </div>
        {rightSlot}
      </div>
    </div>
  );
}