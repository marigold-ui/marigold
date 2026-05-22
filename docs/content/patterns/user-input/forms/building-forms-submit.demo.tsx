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
        <Panel size="form">
          <Panel.Header>
            <Title>Apply promo code</Title>
          </Panel.Header>
          <Panel.Content>
            <TextField label="Promo Code" name="promocode" width={44} />
          </Panel.Content>
          <Panel.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Panel.Footer>
        </Panel>
      </Form>
      {state && (
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      )}
    </Stack>
  );
};
