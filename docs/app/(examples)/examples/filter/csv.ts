import { venueTypes } from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';

const escapeCsv = (value: unknown) => {
  const str = String(value ?? '');
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

export const exportVenuesToCsv = (venues: readonly Venue[]) => {
  const headers = [
    'Name',
    'Type',
    'City',
    'Country',
    'Capacity',
    'Max Price (EUR)',
    'Rating',
    'Next Available',
  ];
  const rows = venues.map(v => [
    v.name,
    venueTypes[v.type] ?? 'Unknown',
    v.city,
    v.country,
    v.capacity,
    v.price.to,
    v.rating,
    v.nextAvailable,
  ]);
  const csv = [
    headers.join(','),
    ...rows.map(r => r.map(escapeCsv).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'venues.csv';
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
