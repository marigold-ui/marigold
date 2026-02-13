import type { FileFieldProps } from '@marigold/components';
import { FileField } from '@marigold/components';

export default (props: FileFieldProps) => (
  <FileField label="Upload file" {...props} />
);
