import { ContextualHelp } from '@marigold/components';
import { Link } from '@marigold/components';

export default () => (
  <ContextualHelp>
    <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
    <ContextualHelp.Content>
      This Component explains the most important thinks in the This feature
      explains important functions to you directly in the context of the page.
      <br />
      <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
        To the documentation
      </Link>
    </ContextualHelp.Content>
  </ContextualHelp>
);
