import { HomeIcon, ListIcon, SearchIcon } from './Icons.jsx';

export default function BottomNav({ tab, onChange }) {
  const items = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'all', label: 'All', Icon: ListIcon },
    { id: 'search', label: 'Search', Icon: SearchIcon },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200">
      <div className="grid grid-cols-3">
        {items.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center justify-center py-2.5 transition ${
                active ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-[10px] mt-0.5 font-semibold ${active ? '' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}