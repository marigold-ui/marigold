import { Input, Label, Stack } from '@marigold/components';

export const InputType = () => (
  <Stack space="medium">
    <Label htmlFor="input1">
      Password
      <Input id="input1" type="password" />
    </Label>
    <Label htmlFor="input2">
      Date
      <Input id="input2" type="date" />
    </Label>
    <Label htmlFor="input3">
      Submit
      <Input id="input3" type="submit" />
    </Label>
  </Stack>
);
