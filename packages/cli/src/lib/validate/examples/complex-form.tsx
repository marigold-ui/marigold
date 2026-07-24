import { Button, Stack, TextField } from '@marigold/components';

const ComplexForm = (): React.ReactElement => (
  <form>
    <Stack space={4}>
      <TextField label="Email" type="email" required />
      <TextField label="Password" type="password" required />
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Stack>
  </form>
);

export default ComplexForm;
