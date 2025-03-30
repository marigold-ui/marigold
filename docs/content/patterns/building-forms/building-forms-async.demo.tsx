import { useActionState } from 'react';
import { Button, Form, Headline, Stack, TextField } from '@marigold/components';

export default () => {
  const [{ errors, result }, submitAction, isPending] = useActionState(
    async (_previousState, formData) => {
      let errors = {};
      let firstName = formData.get('firstname');

      if (firstName === '') {
        errors = { ...errors, firstname: 'Please enter a username.' };
      }

      return { errors: errors };
    },
    {}
  );

  return (
    <>
      <Headline level={2}>User Search</Headline>
      <Form
        action={submitAction}
        validationBehavior="aria"
        validationErrors={errors}
      >
        <Stack space={4}>
          <Stack space={4}>
            <TextField
              type="text"
              name="firstname"
              label="Firstname:"
              placeholder="Firstname"
              error={errors && errors.firstname}
              errorMessage={errors?.firstname}
            />
            <TextField
              type="text"
              name="name"
              label="Name:"
              error={errors && errors.name}
              errorMessage={errors?.name}
              placeholder="Name"
            />
            <TextField
              type="text"
              name="adress"
              error={errors && errors.name}
              errorMessage={errors?.adress}
              placeholder="Adress"
              label="Adress:"
            />
            <TextField
              type="text"
              name="postcode"
              error={errors && errors.name}
              errorMessage={errors?.postcode}
              placeholder="Postcode"
              label="Postcode:"
            />
          </Stack>
          <Stack space={4}>
            <TextField
              type="tel"
              name="phone"
              error={errors && errors.name}
              errorMessage={errors?.phone}
              placeholder="Phone"
              label="Phone:"
            />
          </Stack>
          <Stack alignX="right">
            <Button type="submit" loading={isPending} variant="primary">
              Search
            </Button>
          </Stack>
          <p>{result && `Results: ${result}`}</p>
        </Stack>
      </Form>
    </>
  );
};

const waitTwoSec = async (): Promise<string | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, 2000);
  });
};
