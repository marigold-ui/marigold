import { SectionMessage, Text } from '@marigold/components';

export default () => (
  <SectionMessage variant="error">
    <SectionMessage.Title>Wrong here.</SectionMessage.Title>
    <SectionMessage.Content>
      <Text>Hello, I am a simple error message.</Text>
    </SectionMessage.Content>
  </SectionMessage>
);
