import { useActionState } from 'react';
import {
  Button,
  Columns,
  Form,
  Headline,
  Stack,
  TextField,
} from '@marigold/components';

export default () => {
  const [state, submitAction, isPending] = useActionState<
    { result?: string | undefined; error?: string },
    FormData
  >(async (_previousState, formData) => {
    // Two seconds loading time to simulate pending
    const error = await waitTwoSec();
    if (error) {
      return { error: error };
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
                errorMessage={state.error}
                error={state.error != null}
                placeholder="Firstname"
              />
              <TextField
                type="text"
                name="name"
                label="Name:"
                errorMessage={state.error}
                error={state.error != null}
                placeholder="Name"
              />
            </Columns>
            <TextField
              type="text"
              name="adress"
              errorMessage={state.error}
              error={state.error != null}
              placeholder="Adress"
              label="Adress:"
            />
            <TextField
              type="text"
              name="postcode"
              errorMessage={state.error}
              error={state.error != null}
              placeholder="Postcode"
              label="Postcode:"
            />
          </Stack>
          <Stack space={4}>
            <TextField
              type="tel"
              name="phone number"
              errorMessage={state.error}
              error={state.error != null}
              placeholder="Phone Number"
              label="Phone number:"
            />
          </Stack>
          <Stack alignX="right">
            <Button type="submit" loading={isPending} variant="primary">
              Search
            </Button>
          </Stack>
          <p>{state.result && 'Results: ' + state.result}</p>
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
