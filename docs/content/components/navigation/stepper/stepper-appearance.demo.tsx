import { Stepper, StepperProps } from '@marigold/components';

export default (props: StepperProps) => (
  <Stepper
    aria-label="Checkout progress"
    selectedKey="plan"
    completedKeys={['signin']}
    {...props}
  >
    <Stepper.Item id="signin">Sign in</Stepper.Item>
    <Stepper.Item id="plan">Choose plan</Stepper.Item>
    <Stepper.Item id="pay">Pay</Stepper.Item>
    <Stepper.Item id="done">Done</Stepper.Item>
  </Stepper>
);
