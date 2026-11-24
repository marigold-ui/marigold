import { Stepper } from '@marigold/components';

export default () => (
  <Stepper
    aria-label="Step states"
    selectedKey="current"
    completedKeys={['done', 'doneLocked']}
    errorKeys={['failed']}
    disabledKeys={['locked', 'doneLocked']}
  >
    <Stepper.Item id="done">Completed</Stepper.Item>
    <Stepper.Item id="current">Current</Stepper.Item>
    <Stepper.Item id="failed">Error</Stepper.Item>
    <Stepper.Item id="locked">Disabled</Stepper.Item>
    <Stepper.Item id="doneLocked">Completed + disabled</Stepper.Item>
    <Stepper.Item id="later">Upcoming</Stepper.Item>
  </Stepper>
);
