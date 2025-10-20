import RAC, { FileTrigger } from 'react-aria-components';
import { Button } from '@marigold/components';

type RemovedProps = 'className' | 'style';

export interface FileTriggerProps
  extends Omit<RAC.FileTriggerProps, RemovedProps> {
  allowsMultiple?: RAC.FileTriggerProps['allowsMultiple'];
  acceptedFileType?: RAC.FileTriggerProps['acceptedFileTypes'];
  acceptDirectory?: RAC.FileTriggerProps['acceptDirectory'];
  onSelect?: RAC.FileTriggerProps['onSelect'];
  /**
   * Label for the upload button
   */
  label: string;
}
const _FileTrigger = ({ label, ...rest }: FileTriggerProps) => {
  return (
    <FileTrigger {...rest}>
      <Button>{label}</Button>
    </FileTrigger>
  );
};

export { _FileTrigger as FileTrigger };
