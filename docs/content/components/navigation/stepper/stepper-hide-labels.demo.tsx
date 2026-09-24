import { Stepper } from '@marigold/components';

export default () => (
  <Stepper
    aria-label="Event creation progress"
    hideLabels
    selectedKey="categories"
    completedKeys={['basics', 'dates']}
  >
    <Stepper.Item id="basics">Basic data</Stepper.Item>
    <Stepper.Item id="dates">Dates</Stepper.Item>
    <Stepper.Item id="categories">Ticket categories</Stepper.Item>
    <Stepper.Item id="prices">Prices</Stepper.Item>
    <Stepper.Item id="publish">Publish</Stepper.Item>
  </Stepper>
);
