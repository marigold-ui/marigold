import { type Ref, useId } from 'react';
import type RAC from 'react-aria-components';
import { FileTrigger } from 'react-aria-components/FileTrigger';
import type { AriaLabelingProps } from '@marigold/types';
import { Button } from '../Button/Button';
import { Upload } from '../icons/Upload';
import { joinIds } from '../utils/useLabelAddon';

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
  'aria-label': ariaLabel,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  ...rest
}: FileTriggerProps) => {
  const id = useId();

  return (
    <FileTrigger {...rest}>
      <Button
        ref={ref}
        id={id}
        aria-label={ariaLabel}
        // Reference the button itself last, so it reads "<label>, Upload".
        aria-labelledby={labelledBy ? joinIds(labelledBy, id) : undefined}
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
