import { useActionState } from 'react';
import { Button, Form, Stack, TextField } from '@marigold/components';

export default () => {
  const [state, formAction] = useActionState<object | null, FormData>(
    (_previousState, formData) => {
      // Access form data by form field name
      return { promocode: formData.get('promocode') };
    },
    null
  );

  return (
    <Stack space={4}>
      <Form action={formAction}>
        <Stack space={1} alignX="left">
          <TextField label="Promo Code" name="promocode" width={44} />
          <Button variant="primary" size="small" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
      {state && (
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      )}
    </Stack>
  );
};
