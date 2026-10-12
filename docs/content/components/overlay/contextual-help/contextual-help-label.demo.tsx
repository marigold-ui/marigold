import { ContextualHelp, Link, TextField } from '@marigold/components';

export default () => (
  <TextField
    label="Email"
    addon={
      <ContextualHelp offset={2}>
        <ContextualHelp.Title>Email Format</ContextualHelp.Title>
        <ContextualHelp.Content>
          Please enter a valid email address in the format: user@example.com
          <br />
          <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
            Learn more
          </Link>
        </ContextualHelp.Content>
      </ContextualHelp>
    }
    type="email"
    description="We'll never share your email"
    width="fit"
  />
);
