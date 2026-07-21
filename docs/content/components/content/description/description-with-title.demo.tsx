import { Description, Panel, Title } from '@marigold/components';

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Storage usage</Title>
      <Description>
        42% of your storage quota is currently in use. Upgrade your plan to
        unlock more space.
      </Description>
    </Panel.Header>
  </Panel>
);
