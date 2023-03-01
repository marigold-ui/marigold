import { Label, Input } from '@marigold/components';

export const LabelInput = () => (
  <Label htmlFor="input">
    Type in your Firstname
    <Input id="input" type="text" placeholder="Firstname" />
  </Label>
);
