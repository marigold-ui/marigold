import { Input, Label } from '@marigold/components';

export const DisabledInput = () => (
  <Label htmlFor="input2">
    Disabled Input
    <Input id="input2" placeholder="Disabled" disabled />
  </Label>
);
