import { SectionMessage, SectionMessageProps } from '@marigold/components';

export default (props: SectionMessageProps) => (
  <SectionMessage {...props}>
    <SectionMessage.Title>This page is read-only!</SectionMessage.Title>
    <SectionMessage.Content>
      You don't have permission to edit this page. If you think you should have
      editing rights, contact your group administrator.
    </SectionMessage.Content>
  </SectionMessage>
);
