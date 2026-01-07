'use client';

import type { TextAreaProps } from '@marigold/components';
import { TextArea } from '@marigold/components';

export default (props: TextAreaProps) => (
  <TextArea label="Comment" width="1/2" {...props} />
);
