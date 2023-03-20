import { Label, Input } from '@marigold/components';

export const LabelInput = () => (
  <Label htmlFor="input">
    Type in your Firstname
    <Input>
      <Input.Field id="input" type="text" placeholder="Firstname" />
    </Input>
  </Label>
);
