import { Inline, TextField } from '@marigold/components';

export default () => (
  <Inline space={4} alignX="center">
    <TextField label="E-Mail" error defaultValue="I'm in error state" />
    <TextField label="Name" error errorMessage="Please fill in your name" />
  </Inline>
);
