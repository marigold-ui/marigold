import { Inline, Link, SectionMessage, Stack } from '@marigold/components';

export default () => (
  <SectionMessage closeButton>
    <SectionMessage.Title>This page is read-only.</SectionMessage.Title>
    <SectionMessage.Content>
      <Stack space={2}>
        You don't have permission to edit this page. If you think you should
        have editing rights, contact your group administrator.
        <Inline space={4}>
          <Link href="#">View team roles</Link>
          <Link href="#">About permission</Link>
        </Inline>
      </Stack>
    </SectionMessage.Content>
  </SectionMessage>
);
