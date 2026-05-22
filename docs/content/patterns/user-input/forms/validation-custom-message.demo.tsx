import {
  Button,
  Description,
  Form,
  Panel,
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
          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            errorMessage={({ validationDetails }) =>
              validationDetails.valueMissing
                ? 'Please enter your email address!'
                : ''
            }
          />
        </Panel.Content>
        <Panel.Footer>
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </Panel.Footer>
      </Panel>
    </Form>
  );
};
