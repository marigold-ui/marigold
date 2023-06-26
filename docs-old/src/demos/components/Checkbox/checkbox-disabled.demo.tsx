import { Checkbox, Stack } from '@marigold/components';

export const CheckboxDisabledDemo = () => (
  <Stack space="small">
    <Checkbox disabled>Disabled</Checkbox>
    <Checkbox checked disabled>
      Checked and disabled
    </Checkbox>
  </Stack>
);
