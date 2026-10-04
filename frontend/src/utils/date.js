/**
 * Week helpers — weeks run Monday → Sunday per spec.
 */

export function startOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
  const diff = (day === 0 ? -6 : 1 - day); // shift to Monday
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfWeek(d) {
  const start = startOfWeek(d);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

export function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function fmtRange(start, end) {
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();
  const monthShort = (d) =>
    d.toLocaleString('en-US', { month: 'short' });
  if (sameMonth) {
    return `${monthShort(start)} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }
  if (sameYear) {
    return `${monthShort(start)} ${start.getDate()} – ${monthShort(end)} ${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${monthShort(start)} ${start.getDate()}, ${start.getFullYear()} – ${monthShort(end)} ${end.getDate()}, ${end.getFullYear()}`;
}

export function fmtTime(d) {
  return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function fmtDateInput(d) {
  // YYYY-MM-DDTHH:mm for <input type="datetime-local">
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function groupByWeek(tasks) {
  const map = new Map();
  for (const t of tasks) {
    const start = startOfWeek(t.date);
    const key = start.toISOString();
    if (!map.has(key)) {
      map.set(key, { start, end: endOfWeek(t.date), tasks: [] });
    }
    map.get(key).tasks.push(t);
  }
  return [...map.values()].sort((a, b) => b.start - a.start);
}

export function isThisWeek(d) {
  const now = new Date();
  const s = startOfWeek(now);
  const e = endOfWeek(now);
  return new Date(d) >= s && new Date(d) <= e;
}