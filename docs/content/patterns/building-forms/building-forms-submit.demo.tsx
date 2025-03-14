import { useActionState } from 'react';
import { Button, Form, Stack, TextField } from '@marigold/components';

export default () => {
  /*const [result, setResult] = useState<object>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh.
    e.preventDefault();

    // Transform form data to regular object
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit or do whatever you want
    setResult(data);
  };*/
  const [result, formAction] = useActionState<object | null, FormData>(
    (_previousState, formData) => {
      const promoCode = formData.get('promocode');
      return { promocode: promoCode };
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
      {result && (
        <pre>
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre>
      )}
    </Stack>
  );
};
