import { Checkbox } from '@marigold/components';

export default () => (
  <Checkbox
    label="Accept terms and conditions"
    error
    errorMessage="You must accept the terms to continue."
  />
);
