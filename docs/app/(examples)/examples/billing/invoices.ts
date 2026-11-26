// Monthly invoices for the last six months, newest first. Dates are worked out
// from today, so the newest invoice is always this month's.
const plan = [
  { amount: '€480.00', status: 'due' },
  { amount: '€480.00', status: 'paid' },
  { amount: '€480.00', status: 'paid' },
  { amount: '€420.00', status: 'paid' },
  { amount: '€420.00', status: 'failed' },
  { amount: '€420.00', status: 'paid' },
] as const;

const firstOfMonth = (monthsAgo: number) => {
  const now = new Date();
  // 12:00 UTC, so every time zone shows the same calendar day.
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsAgo, 1, 12)
  );
};

export const getInvoices = () =>
  plan.map((invoice, monthsAgo) => {
    const date = firstOfMonth(monthsAgo);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return {
      id: `INV-${date.getUTCFullYear()}-${month}`,
      // The invoice covers the month it is issued in, e.g. "June 2026".
      period: new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date),
      date,
      ...invoice,
    };
  });

export type Invoice = ReturnType<typeof getInvoices>[number];
