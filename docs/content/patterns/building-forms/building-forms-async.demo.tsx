import { useActionState } from 'react';
import { Button, Form, Headline, Stack, TextField } from '@marigold/components';

type FormState = {
  name: string;
  email: string;
  errors: {
    name?: string;
    email?: string;
  };
  success?: string;
};

const validateField = (name: string, value: string) => {
  if (!value.trim()) {
    return `${name} is required`;
  }
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Invalid email format';
  }
  return undefined;
};

export default () => {
  const [{ errors, success, ...rest }, submitAction, isPending] =
    useActionState<FormState, FormData>(
      async (_previousState, formData) => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;

        const errors = {
          name: validateField('name', name),
          email: validateField('email', email),
        };

        if (errors.name || errors.email) {
          return { name, email, errors, success: '' };
        }

        // Simulate async action (e.g., API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
          name,
          email,
          errors: {},
          success: `You searched successfully for ${name} and ${email}`,
        };
      },
      {
        name: '',
        email: '',
        errors: {},
        success: '',
      }
    );

  console.log(rest);
  return (
    <>
      <Headline level={2}>User Search</Headline>
      <Form action={submitAction} validationBehavior="aria">
        <Stack space={4}>
          <Stack space={4}>
            <TextField
              type="text"
              name="name"
              label="Name:"
              placeholder="Name"
              defaultValue={rest.name}
              error={errors.name !== undefined}
              errorMessage={errors?.name}
            />
            <TextField
              type="text"
              name="email"
              label="Email:"
              placeholder="Email"
              defaultValue={rest.email}
              error={errors.email !== undefined}
              errorMessage={errors?.email}
            />
          </Stack>
          <Stack alignX="right">
            <Button type="submit" loading={isPending} variant="primary">
              Search
            </Button>
          </Stack>
          {success && <p>{success}</p>}
        </Stack>
      </Form>
    </>
  );
};
