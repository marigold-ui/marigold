import { Message, Text } from '@marigold/components';

export default () => (
  <Message>
    <Message.Title>There is an update available.</Message.Title>
    <Message.Content>
      <Text>Hello, I am a simple info message.</Text>
    </Message.Content>
  </Message>
);
