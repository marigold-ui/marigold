import type RAC from 'react-aria-components';

import { DateValue } from '@react-aria/calendar';

import { WidthProp } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'isDisabled' | 'isReadOnly' | 'isInvalid';

export interface CalendarProps
  extends Omit<RAC.CalendarProps<DateValue>, RemovedProps> {
  disabled?: boolean;
  readOnly?: boolean;
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  error?: boolean;
  errorMessage?: string;
}

// Component
// ---------------
export const _Calendar = ({
  disabled,
  readOnly,
  error,
  size,
  variant,
  ...rest
}: CalendarProps) => {
  const props: RAC.CalendarProps<DateValue> = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isInvalid: error,
    ...rest,
  };
};

export { _Calendar as Calendar };
