import { SectionMessage, Text } from '@marigold/components';

export default () => (
  <SectionMessage variant="warning">
    <SectionMessage.Title>Danger Zone!</SectionMessage.Title>
    <SectionMessage.Content>
      <Text>Hello, I am a simple warning message.</Text>
    </SectionMessage.Content>
  </SectionMessage>
);
