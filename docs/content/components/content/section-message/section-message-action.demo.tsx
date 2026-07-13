import {
  Button,
  Inline,
  Link,
  SectionMessage,
  Stack,
} from '@marigold/components';

export default () => (
  <SectionMessage closeButton>
    <SectionMessage.Title>This page is read-only.</SectionMessage.Title>
    <SectionMessage.Content>
      <Stack space={3} alignX="left">
        You don't have permission to edit this page. If you think you should
        have editing rights, contact your group administrator.
        <Inline space={4} alignY="center">
          <Button variant="primary" size="small">
            Request access
          </Button>
          <Link href="#">View team roles</Link>
        </Inline>
      </Stack>
    </SectionMessage.Content>
  </SectionMessage>
);
