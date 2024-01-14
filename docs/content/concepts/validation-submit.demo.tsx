import { Button, Form, Inset, Stack, TextField } from '@marigold/components';

export default () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh.
    e.preventDefault();

    // Transform form data to regular object
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit or do whatever you want
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack space={1} alignX="left">
        <TextField label="Promo Code" name="promocode" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
