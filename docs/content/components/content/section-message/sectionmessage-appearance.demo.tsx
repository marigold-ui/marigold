import { SectionMessage, Text } from '@marigold/components';
import type { SectionMessageProps } from '@marigold/components';

export default (props: SectionMessageProps) => (
  <SectionMessage {...props}>
    <SectionMessage.Title>This page is read-only!</SectionMessage.Title>
    <SectionMessage.Content>
      <Text>
        You don't have permission to edit this page. If you think you should
        have editing rights, contact your group administrator.
      </Text>
    </SectionMessage.Content>
  </SectionMessage>
);
