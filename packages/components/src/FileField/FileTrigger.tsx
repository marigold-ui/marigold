import RAC, { FileTrigger } from 'react-aria-components';
import { Button } from '@marigold/components';
import { Upload } from '@marigold/icons';

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
  disabled?: boolean;
}

const _FileTrigger = ({ label, disabled, ...rest }: FileTriggerProps) => {
  return (
    <FileTrigger {...rest}>
      <Button disabled={disabled}>
        <Upload />
        {label}
      </Button>
    </FileTrigger>
  );
};

export { _FileTrigger as FileTrigger };
