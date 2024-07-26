import { Stack, TextField } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <TextField id="field-full" label="Full width" defaultValue="Hello World!" />
    <TextField
      id="field-auto"
      label="Auto width"
      defaultValue="Hello World!"
      width="auto"
    />
    <TextField
      id="field-max"
      label="Max width"
      defaultValue="Hello World!"
      width="max"
    />
    <TextField
      id="field-fit"
      label="Fit width"
      defaultValue="Hello World!"
      width="fit"
    />
    <TextField
      id="field-relative"
      label="Relative width"
      defaultValue="Hello World!"
      width="3/5"
    />
  </Stack>
);
