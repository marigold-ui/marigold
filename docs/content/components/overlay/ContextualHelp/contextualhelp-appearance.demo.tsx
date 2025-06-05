import { ContextualHelp } from '@marigold/components';
import { Headline } from '@marigold/components';
import { Text } from '@marigold/components';
import { Link } from '@marigold/components';

export default () => (
  <ContextualHelp>
    <Headline size="level-3">Whats this?</Headline>
    <Text size="sm">
      This Component explains the most important thinks in the This feature
      explains important functions to you directly in the context of the page.
      <br />
      <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
        To the documentation
      </Link>
    </Text>
  </ContextualHelp>
);
