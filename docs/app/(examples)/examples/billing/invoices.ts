export const invoices = [
  {
    id: 'INV-2026-006',
    period: 'June 2026',
    date: '2026-06-01',
    amount: '€480.00',
    status: 'due',
  },
  {
    id: 'INV-2026-005',
    period: 'May 2026',
    date: '2026-05-01',
    amount: '€480.00',
    status: 'paid',
  },
  {
    id: 'INV-2026-004',
    period: 'April 2026',
    date: '2026-04-01',
    amount: '€480.00',
    status: 'paid',
  },
  {
    id: 'INV-2026-003',
    period: 'March 2026',
    date: '2026-03-01',
    amount: '€420.00',
    status: 'paid',
  },
  {
    id: 'INV-2026-002',
    period: 'February 2026',
    date: '2026-02-01',
    amount: '€420.00',
    status: 'failed',
  },
  {
    id: 'INV-2026-001',
    period: 'January 2026',
    date: '2026-01-01',
    amount: '€420.00',
    status: 'paid',
  },
] as const;

export type Invoice = (typeof invoices)[number];
