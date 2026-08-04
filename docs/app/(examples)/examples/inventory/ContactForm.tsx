import {
  Button,
  Checkbox,
  Description,
  Form,
  Inline,
  Link,
  Panel,
  Stack,
  TextArea,
  TextField,
  Title,
} from '@marigold/components';

export const ContactForm = () => (
  <Panel size="form">
    <Panel.Header>
      <Title>Contact sales</Title>
      <Description>
        Interested in our product? Fill out the form below and our sales team
        will get in touch with you soon.
      </Description>
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
