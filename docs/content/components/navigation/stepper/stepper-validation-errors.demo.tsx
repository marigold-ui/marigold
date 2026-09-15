import type { Key } from 'react';
import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  Stack,
  Stepper,
  Text,
  TextField,
} from '@marigold/components';

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

const validateStep = (
  step: string,
  values: Record<string, string>
): Record<string, string> => {
  if (step === 'contact' && !values.email.includes('@')) {
    return { email: 'Enter a valid email address.' };
  }
  if (step === 'payment' && !/^\d{16}$/.test(values.card)) {
    return { card: 'The card number needs 16 digits.' };
  }
  return {};
};

export default () => {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<Key[]>([]);
  const [failed, setFailed] = useState<Key[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ email: '', card: '' });
  const step = STEPS[index];

  const edit = (field: string) => (value: string) => {
    setValues(current => ({ ...current, [field]: value }));
    setFieldErrors({});
    setFailed(keys => keys.filter(key => key !== step.id));
  };

  const onContinue = () => {
    const failures = validateStep(step.id, values);
    setFieldErrors(failures);

    if (Object.keys(failures).length > 0) {
      setFailed(keys => (keys.includes(step.id) ? keys : [...keys, step.id]));
      return;
    }

    setCompleted(done => (done.includes(step.id) ? done : [...done, step.id]));
    setIndex(current => current + 1);
  };

  return (
    <Stack space={8}>
      <Stepper
        aria-label="Checkout progress"
        selectedKey={step.id}
        completedKeys={completed}
        errorKeys={failed}
        onSelectionChange={key =>
          setIndex(STEPS.findIndex(item => item.id === key))
        }
      >
        {STEPS.map(item => (
          <Stepper.Item key={item.id} id={item.id}>
            {item.label}
          </Stepper.Item>
        ))}
      </Stepper>

      <Form validationErrors={fieldErrors} unstyled>
        {step.id === 'contact' && (
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onChange={edit('email')}
          />
        )}
        {step.id === 'payment' && (
          <TextField
            name="card"
            label="Card number"
            value={values.card}
            onChange={edit('card')}
          />
        )}
        {step.id === 'review' && <Text>Everything checks out.</Text>}
      </Form>

      <ButtonGroup>
        <Button
          variant="secondary"
          disabled={index === 0}
          onPress={() => setIndex(current => current - 1)}
        >
          Back
        </Button>
        <Button
          variant="primary"
          disabled={index === STEPS.length - 1}
          onPress={onContinue}
        >
          Continue
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
