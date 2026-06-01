import type RAC from 'react-aria-components';
import { FileTrigger } from 'react-aria-components/FileTrigger';
import { Button } from '../Button/Button';
import { Upload } from '../icons/Upload';

type RemovedProps = 'className' | 'style';

export interface FileTriggerProps extends Omit<
  RAC.FileTriggerProps,
  RemovedProps
> {
  allowsMultiple?: RAC.FileTriggerProps['allowsMultiple'];
  acceptedFileType?: RAC.FileTriggerProps['acceptedFileTypes'];
  acceptDirectory?: RAC.FileTriggerProps['acceptDirectory'];
  onSelect?: RAC.FileTriggerProps['onSelect'];
  /**
   * Label for the upload button
   */
  label: string;
  disabled?: boolean;
  size?: string;
}

const _FileTrigger = ({ label, disabled, size, ...rest }: FileTriggerProps) => {
  return (
    <FileTrigger {...rest}>
      <Button disabled={disabled} size={size}>
        <Upload />
        {label}
      </Button>
    </FileTrigger>
  );
};

export { _FileTrigger as FileTrigger };
