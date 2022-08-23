import { Label, Input } from '@marigold/components';

export const BasicInput = () => (
  <Label htmlFor="input">
    Give me your input:
    <Input id="input" type="text" placeholder="Placeholder" />
  </Label>
);
