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
  disabled?: boolean;
}

const UploadSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-upload-icon lucide-upload"
  >
    <path d="M12 3v12" />
    <path d="m17 8-5-5-5 5" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  </svg>
);

const _FileTrigger = ({ label, disabled, ...rest }: FileTriggerProps) => {
  return (
    <FileTrigger {...rest}>
      <Button disabled={disabled}>
        <UploadSvg />
        {label}
      </Button>
    </FileTrigger>
  );
};

export { _FileTrigger as FileTrigger };
