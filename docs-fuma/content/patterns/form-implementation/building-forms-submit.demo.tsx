'use client';

import { useActionState } from 'react';
import { Button, Form, Stack, TextField } from '@marigold/components';

type FormState = {
  promoCode: FormDataEntryValue | null;
};

const INITIAL_STATE: FormState = {
  promoCode: null,
};

export default () => {
  const [state, formAction] = useActionState<FormState, FormData>(
    (_previousState: FormState, formData: FormData) => {
      // Access form data by form field name
      return { promoCode: formData.get('promocode') };
    },
    INITIAL_STATE
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
