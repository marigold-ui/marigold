import { Message, Text } from '@marigold/components';

export default () => (
  <Message variant="error">
    <Message.Title>Wrong here.</Message.Title>
    <Message.Content>
      <Text>Hello, I am a simple error message.</Text>
    </Message.Content>
  </Message>
);
