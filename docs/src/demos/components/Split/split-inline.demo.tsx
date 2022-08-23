import { Inline, Split, Text } from '@marigold/components';

export const SplitWithInline = () => (
  <Inline space="small">
    <Text>Blog</Text>
    <Text>About</Text>
    <Split />
    <Text>Login</Text>
  </Inline>
);
