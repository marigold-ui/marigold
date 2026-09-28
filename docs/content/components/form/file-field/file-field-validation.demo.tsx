import { Button, FileField, Form, Stack } from '@marigold/components';

export default () => (
  <Form>
    <Stack space={4} alignX="left">
      <FileField
        label="Signed contract"
        name="contract"
        accept={['application/pdf', '.pdf']}
        maxSize={2_000_000}
        required
        description="PDF, up to 2 MB."
        errorMessage="Please attach the signed contract."
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Stack>
  </Form>
);
