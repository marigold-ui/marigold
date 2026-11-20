import type { Key } from 'react';
import { useState } from 'react';
import {
  Button,
  Headline,
  Inline,
  Stack,
  Stepper,
  Text,
  TextField,
} from '@marigold/components';

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'review', label: 'Review' },
];

const StepPanel = ({ step }: { step: Key }) => {
  if (step === 'contact') {
    return (
      <Stack space={4}>
        <Headline level={3}>Contact</Headline>
        <TextField label="Full name" />
        <TextField label="Email" type="email" />
      </Stack>
    );
  }

  if (step === 'delivery') {
    return (
      <Stack space={4}>
        <Headline level={3}>Delivery</Headline>
        <TextField label="Street and number" />
        <TextField label="City" />
      </Stack>
    );
  }

  return (
    <Stack space={4}>
      <Headline level={3}>Review</Headline>
      <Text>Check your details, then place the order.</Text>
    </Stack>
  );
};

export default () => {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<Key[]>([]);
  const [placed, setPlaced] = useState(false);
  const isLast = index === STEPS.length - 1;

  const advance = () => {
    setCompleted(done =>
      done.includes(STEPS[index].id) ? done : [...done, STEPS[index].id]
    );
    if (isLast) setPlaced(true);
    else setIndex(current => current + 1);
  };

  return (
    <Stack space={8}>
      <Stepper
        aria-label="Order progress"
        selectedKey={STEPS[index].id}
        completedKeys={completed}
        onSelectionChange={key =>
          setIndex(STEPS.findIndex(step => step.id === key))
        }
      >
        {STEPS.map(step => (
          <Stepper.Item key={step.id} id={step.id}>
            {step.label}
          </Stepper.Item>
        ))}
      </Stepper>

      <StepPanel step={STEPS[index].id} />

      {placed && <Text>Your order has been placed.</Text>}

      <Inline alignX="between">
        <Button
          variant="secondary"
          disabled={index === 0}
          onPress={() => setIndex(current => current - 1)}
        >
          Back
        </Button>
        <Button variant="primary" onPress={advance}>
          {isLast ? 'Place order' : 'Continue'}
        </Button>
      </Inline>
    </Stack>
  );
};
