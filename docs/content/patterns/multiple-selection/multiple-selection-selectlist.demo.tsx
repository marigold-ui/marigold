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
    label="Payment Methods"
    items={paymentMethods}
  >
    {item => <SelectList.Item id={item.id}>{item.name}</SelectList.Item>}
  </SelectList>
);
