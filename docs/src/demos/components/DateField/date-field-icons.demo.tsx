import { Button, DateField } from '@marigold/components';
import { Calendar, SmilieSatisfied } from '@marigold/icons';

export const DateFieldWithIcons = () => (
  <DateField
    label="Date field"
    icon={<SmilieSatisfied />}
    action={
      <Button style={{ padding: '8px' }} variant="text">
        <Calendar />
      </Button>
    }
  />
);
