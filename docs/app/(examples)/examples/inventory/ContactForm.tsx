import {
  Button,
  Checkbox,
  Form,
  Inline,
  Link,
  Panel,
  Stack,
  TextArea,
  TextField,
} from '@marigold/components';

export const ContactForm = () => (
  <Panel size="form">
    <Panel.Header>
      <Panel.Title>Contact sales</Panel.Title>
      <Panel.Description>
        Interested in our product? Fill out the form below and our sales team
        will get in touch with you soon.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Form>
        <Stack space="regular">
          <Inline space="related" noWrap>
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
    </Panel.Content>
  </Panel>
);
