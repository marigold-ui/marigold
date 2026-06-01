import { ActionButton, Description, Page, Title } from '@marigold/components';

export default () => (
  <Page>
    <Page.Header>
      <Title>Team members</Title>
      <Description>
        Invite and manage who has access to this workspace.
      </Description>
      <ActionButton variant="primary">Invite member</ActionButton>
    </Page.Header>
  </Page>
);
