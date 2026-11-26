import { monthsAgo } from '../../_shared/demo-data';

// Monthly invoices for the last six months, newest first. Each is issued on the
// first of the month it covers, worked out from today, so the newest invoice is
// always this month's. Amounts are in EUR.
const history = [
  { amount: 480, status: 'due' },
  { amount: 480, status: 'paid' },
  { amount: 480, status: 'paid' },
  { amount: 420, status: 'paid' },
  { amount: 420, status: 'failed' },
  { amount: 420, status: 'paid' },
] as const;

export const getInvoices = () =>
  history.map((invoice, index) => {
    const date = monthsAgo(index);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return { id: `INV-${date.getUTCFullYear()}-${month}`, date, ...invoice };
  });

export type Invoice = ReturnType<typeof getInvoices>[number];
