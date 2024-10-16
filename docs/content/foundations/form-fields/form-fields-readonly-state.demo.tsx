import { Headline, Stack, Switch } from '@marigold/components';

export default () => {
  return (
    <Stack space={2}>
      <Headline level={'5'}>ReadOnly State</Headline>
      <Switch readOnly>Settings Locked</Switch>
    </Stack>
  );
};
