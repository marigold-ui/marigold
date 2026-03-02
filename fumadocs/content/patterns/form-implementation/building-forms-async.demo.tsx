import { useActionState } from 'react';
import { Button, Form, Headline, Stack, TextField } from '@marigold/components';

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
    <>
      <Headline level={2}>User Search</Headline>
      <Form action={submitAction}>
        <Stack space={4}>
          <Stack space={4}>
            <TextField
              type="text"
              name="name"
              label="Name:"
              placeholder="Name"
              required
              errorMessage={({ validationDetails }) =>
                validationDetails.valueMissing
                  ? 'Please enter a valid email address!'
                  : ''
              }
            />
            <TextField
              type="email"
              name="email"
              label="Email:"
              placeholder="Email"
              required
            />
          </Stack>
          <Stack alignX="right">
            <Button type="submit" loading={isPending} variant="primary">
              Search
            </Button>
          </Stack>
          {success && <p>{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </Stack>
      </Form>
    </>
  );
};
