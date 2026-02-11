import { Link, SectionMessage, Stack, Text } from '@marigold/components';

export default () => (
  <SectionMessage>
    <SectionMessage.Title>This page is read-only</SectionMessage.Title>
    <SectionMessage.Content>
      <Text>
        You don't have permission to edit this page. If you think you should
        have editing rights, contact your group administrator.
      </Text>
      <Stack>
        <Link>View team roles</Link>
        <Link>About permission</Link>
      </Stack>
    </SectionMessage.Content>
  </SectionMessage>
);
