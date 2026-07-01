import { useActionState } from 'react';
import {
  Button,
  Form,
  Panel,
  Stack,
  TextField,
  Title,
} from '@marigold/components';

type FormState = {
  error?: string;
  success?: string;
};

const INITIAL_STATE: FormState = {
  error: '',
  success: '',
};

export default () => {
  const [{ error, success }, submitAction, isPending] = useActionState<
    FormState,
    FormData
  >(async (_previousState, formData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (Math.random() > 0.5) {
      return {
        ...INITIAL_STATE,
        error: 'An error occurred. Please try again.',
      };
    }
    // Simulate async action (e.g., API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      ...INITIAL_STATE,
      success: `You searched successfully for ${name} and ${email}`,
    };
  }, INITIAL_STATE);

  return (
    <Form action={submitAction}>
      <Panel size="form">
        <Panel.Header>
          <Title>User Search</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space={4}>
            <TextField
              type="text"
              name="name"
              label="Name"
              placeholder="Name"
              required
              errorMessage={({ validationDetails }) =>
                validationDetails.valueMissing ? 'Please enter a name!' : ''
              }
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              required
            />
            {success && <p>{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </Stack>
        </Panel.Content>
        <Panel.Footer>
          <Button type="submit" loading={isPending} variant="primary">
            Search
          </Button>
        </Panel.Footer>
      </Panel>
    </Form>
  );
};
