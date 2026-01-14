'use client';

import { SelectList } from '@marigold/components';

const paymentMethods = [
  { id: 'credit', name: 'Credit Card' },
  { id: 'debit', name: 'Debit Card' },
  { id: 'transfer', name: 'Bank Transfer' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'cash', name: 'Cash' },
];

export default () => (
  <SelectList
    selectionMode="multiple"
    aria-label="Payment Methods"
    items={paymentMethods}
  >
    {(item: object) => (
      <SelectList.Item id={(item as { id: string; name: string }).id}>
        {(item as { id: string; name: string }).name}
      </SelectList.Item>
    )}
  </SelectList>
);
