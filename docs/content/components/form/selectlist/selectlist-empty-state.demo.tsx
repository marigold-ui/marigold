import { Button, SelectList, Text } from '@marigold/components';

export default () => (
  <SelectList
    label="Saved payment methods"
    description="Pick a saved method or add a new one."
    emptyState={
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <Text>No payment methods saved yet.</Text>
        <Button variant="primary">Add payment method</Button>
      </div>
    }
  >
    {[]}
  </SelectList>
);
