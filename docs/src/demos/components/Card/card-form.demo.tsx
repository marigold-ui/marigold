import {
  Button,
  Card,
  Headline,
  Stack,
  Split,
  TextField,
} from '@marigold/components';

export const CardFieldDemo = () => (
  <Card>
    <Stack space="medium">
      <Headline level="3">Personal Settings</Headline>
      <TextField label="Firstname" />
      <TextField label="Lastname" />
      <Split />
      <Button variant="primary">Save</Button>
    </Stack>
  </Card>
);
