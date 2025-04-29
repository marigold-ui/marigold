import type { CheckboxProps } from '@marigold/components';
import { Checkbox, FieldGroup } from '@marigold/components';

export default (props: CheckboxProps) => (
  <FieldGroup labelWidth="0px">
    <Checkbox
      {...props}
      label="I agree to the Terms of Service and Privacy Policy"
    />
  </FieldGroup>
);
