import type { Event } from '@/lib/data/events';

const escapeCsv = (value: unknown) => {
  const raw = String(value ?? '');
  // Neutralize spreadsheet formula injection: a leading =, +, -, or @ makes
  // Excel/Sheets evaluate the cell as a formula. Prefix with a single quote so
  // a user-entered event name stays literal text. (A reference implementation
  // teams copy should be safe by default.)
  const str = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

export const exportEventsToCsv = (events: readonly Event[]) => {
  const headers = [
    'Name',
    'Date',
    'Venue',
    'Category',
    'Price (EUR)',
    'Status',
    'Reservations',
  ];
  const rows = events.map(event => [
    event.name,
    event.date,
    event.venue ?? '',
    event.category,
    event.price,
    event.status,
    event.reservations,
  ]);
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(escapeCsv).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'events.csv';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  // Defer cleanup so Safari has a chance to start the download before the
  // blob URL is revoked.
  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 0);
};
