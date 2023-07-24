import { Checkbox, Stack } from '@marigold/components';

export default () => (
  <Stack space={2}>
    <Checkbox disabled>Disabled</Checkbox>
    <Checkbox checked disabled>
      Checked and disabled
    </Checkbox>
  </Stack>
);
