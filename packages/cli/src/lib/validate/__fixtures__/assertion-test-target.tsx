import { Button, Stack, TextField } from '@marigold/components';

const TestApp = () => (
  <Stack space={4}>
    <TextField label="Name" required />
    <Button variant="primary" onPress={() => console.log('pressed')}>
      Submit
    </Button>
  </Stack>
);

export default TestApp;
