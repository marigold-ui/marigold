import {
  Button,
  Description,
  Form,
  Panel,
  Stack,
  TextField,
  Title,
} from '@marigold/components';

export default () => {
  return (
    <Form>
      <Panel size="form">
        <Panel.Header>
          <Title>Subscribe to our Newsletter</Title>
          <Description>
            Stay updated with our latest news and updates.
          </Description>
        </Panel.Header>
        <Panel.Content>
          <Stack space={4}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              validate={val =>
                val.length && /^\S+@\S+\.\S+$/.test(val)
                  ? ''
                  : 'Please enter a valid email address!'
              }
            />
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </Stack>
        </Panel.Content>
      </Panel>
    </Form>
  );
};
