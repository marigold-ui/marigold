import {
  Button,
  Form,
  Inset,
  Stack,
  Text,
  TextField,
} from '@marigold/components';

export default () => {
  return (
    <Form>
      <Inset space={8}>
        <Stack space={7} alignX="left">
          <Stack>
            <Text fontSize="4xl" weight="extrabold">
              Subscribe to our Newsletter!
            </Text>
            <Text>Stay updated with our latest news and updates.</Text>
          </Stack>

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
      </Inset>
    </Form>
  );
};
