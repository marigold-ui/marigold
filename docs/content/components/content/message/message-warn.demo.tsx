import { Message, Text } from '@marigold/components';

export default () => (
  <Message variant="warning">
    <Message.Title>Danger Zone!</Message.Title>
    <Message.Content>
      <Text>Hello, I am a simple warning message.</Text>
    </Message.Content>
  </Message>
);
