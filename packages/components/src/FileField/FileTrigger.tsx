import type { Ref } from 'react';
import type RAC from 'react-aria-components';
import { FileTrigger } from 'react-aria-components/FileTrigger';
import type { AriaLabelingProps } from '@marigold/types';
import { Button } from '../Button/Button';
import { Upload } from '../icons/Upload';

type RemovedProps = 'className' | 'style';

export interface FileTriggerProps
  extends Omit<RAC.FileTriggerProps, RemovedProps>, AriaLabelingProps {
  allowsMultiple?: RAC.FileTriggerProps['allowsMultiple'];
  acceptDirectory?: RAC.FileTriggerProps['acceptDirectory'];
  onSelect?: RAC.FileTriggerProps['onSelect'];
  /**
   * Label for the upload button
   */
  label: string;
  disabled?: boolean;
  size?: 'default' | 'small' | (string & {});
  /**
   * If true, the button stretches to fill the available width.
   */
  fullWidth?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const _FileTrigger = ({
  label,
  disabled,
  size,
  fullWidth,
  ref,
  'aria-describedby': describedBy,
  ...rest
}: FileTriggerProps) => {
  return (
    <FileTrigger {...rest}>
      <Button
        ref={ref}
        aria-describedby={describedBy}
        disabled={disabled}
        size={size}
        fullWidth={fullWidth}
      >
        <Upload />
        {label}
      </Button>
    </FileTrigger>
  );
};

export { _FileTrigger as FileTrigger };
