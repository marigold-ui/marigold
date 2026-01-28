import { Headline, Stack, Switch } from '@marigold/components';

export default () => {
  return (
    <Stack space={2}>
      <Headline level={'5'}>ReadOnly State</Headline>
      <Switch label="Settings Locked" readOnly />
    </Stack>
  );
};
