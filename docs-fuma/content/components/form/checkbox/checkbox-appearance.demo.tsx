'use client';

import type { CheckboxProps } from '@marigold/components';
import { Checkbox } from '@marigold/components';

export default (props: CheckboxProps) => (
  <Checkbox
    {...props}
    label="I agree to the Terms of Service and Privacy Policy"
  />
);
