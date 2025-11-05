import {
  Button,
  Checkbox,
  Form,
  Headline,
  Inline,
  Link,
  Stack,
  Text,
  TextArea,
  TextField,
} from '@marigold/components';

export const ContactForm = () => (
  <Stack space={12}>
    <Stack space={2}>
      <Headline level="2">Contact sales</Headline>
      <Text variant="muted" weight="light">
        Interested in our product? Fill out the form below and our sales team
        will get in touch with you soon.
      </Text>
    </Stack>
    <Form maxWidth="container">
      <Stack space="fieldY">
        <Inline space="fieldX" noWrap>
          <TextField label="First name" />
          <TextField label="Last name" />
        </Inline>
        <TextField label="Company" />
        <TextField label="Email" type="email" />
        <TextField label="Phone number" type="tel" />
        <TextArea label="Message" rows={4} />
        <Checkbox
          label={
            <span>
              I agree to the <Link href="#">privacy policy</Link>.
            </span>
          }
        />
        <Button variant="primary">Let&apos;s talk</Button>
      </Stack>
    </Form>
  </Stack>
);
