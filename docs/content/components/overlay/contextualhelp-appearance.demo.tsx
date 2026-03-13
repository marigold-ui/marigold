import type { ContextualHelpProps } from '@marigold/components';
import { ContextualHelp, Link, Stack, Text } from '@marigold/components';

export default (props: ContextualHelpProps) => (
  <ContextualHelp {...props}>
    <ContextualHelp.Title>Whats this?</ContextualHelp.Title>
    <ContextualHelp.Content>
      <Stack space={2}>
        <Text>
          This Component explains the most important thinks in the This feature
          explains important functions to you directly in the context of the
          page.
        </Text>
        <Link href="https://www.marigold-ui.io/components/overview?theme=rui">
          To the documentation
        </Link>
      </Stack>
    </ContextualHelp.Content>
  </ContextualHelp>
);
