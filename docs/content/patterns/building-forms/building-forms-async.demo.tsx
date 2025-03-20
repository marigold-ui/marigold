import { useActionState } from 'react';
import {
  Button,
  Columns,
  Form,
  Headline,
  Stack,
  TextField,
} from '@marigold/components';

//TODO: improve example - submitting again seems not to work
export default () => {
  const [{ error, result }, submitAction, isPending] = useActionState<
    { result?: string | undefined; error?: string | null },
    FormData
  >(async (_previousState, formData) => {
    // Two seconds loading time to simulate pending
    const error = await waitTwoSec();
    if (error === null) {
      return { error: 'Fehler' };
    }
    return { result: '0 users found' };
  }, {});

  return (
    <>
      <Headline level={2}>User Search</Headline>
      <Form action={submitAction}>
        <Stack space={4}>
          <Stack space={4}>
            <Columns columns={[2, 2]} space={4}>
              <TextField
                type="text"
                name="firstname"
                label="Firstname:"
                errorMessage={error}
                error={error != null}
                placeholder="Firstname"
              />
              <TextField
                type="text"
                name="name"
                label="Name:"
                errorMessage={error}
                error={error != null}
                placeholder="Name"
              />
            </Columns>
            <TextField
              type="text"
              name="adress"
              errorMessage={error}
              error={error != null}
              placeholder="Adress"
              label="Adress:"
            />
            <TextField
              type="text"
              name="postcode"
              errorMessage={error}
              error={error != null}
              placeholder="Postcode"
              label="Postcode:"
            />
          </Stack>
          <Stack space={4}>
            <TextField
              type="tel"
              name="phone number"
              errorMessage={error}
              error={error != null}
              placeholder="Phone Number"
              label="Phone number:"
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
