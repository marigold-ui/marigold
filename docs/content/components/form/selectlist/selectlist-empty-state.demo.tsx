import { Button, EmptyState, SelectList } from '@marigold/components';

export default () => (
  <SelectList
    label="Saved payment methods"
    description="Pick a saved method or add a new one to charge this invoice."
    emptyState={
      <EmptyState
        title="No saved payment methods yet"
        description="Add a card or bank account to charge invoices automatically. Saved methods show up here the next time you check out."
        action={<Button variant="primary">Add payment method</Button>}
      />
    }
  >
    {[]}
  </SelectList>
);
