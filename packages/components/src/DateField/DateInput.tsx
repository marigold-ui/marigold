import { CalendarDate } from '@internationalized/date';
import { ReactElement, useContext } from 'react';
import type RAC from 'react-aria-components';
import {
  DateInput,
  DatePickerStateContext,
  Group,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { DateSegment } from './DateSegment';

type RemovedProps = 'style' | 'className' | 'children';

const parseDateFromString = (dateString: string): CalendarDate | null => {
  const trimmed = dateString.trim();
  //  different date formats
  const formats = [
    // ISO format: YYYY-MM-DD
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    // European format: DD.MM.YYYY or DD/MM/YYYY
    /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/,
    // US format: MM/DD/YYYY or MM-DD-YYYY
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/,
  ];

  //  ISO format (YYYY-MM-DD)
  const isoMatch = trimmed.match(formats[0]);
  console.log('isoMatch', isoMatch);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10);
    const day = parseInt(isoMatch[3], 10);

    if (isValidDate(year, month, day)) {
      return new CalendarDate(year, month, day);
    }
  }

  //  European format (DD.MM.YYYY or DD/MM/YYYY)
  const europeanMatch = trimmed.match(formats[1]);
  console.log('europeanMatch', europeanMatch);
  if (europeanMatch) {
    const day = parseInt(europeanMatch[1], 10);
    const month = parseInt(europeanMatch[2], 10);
    const year = parseInt(europeanMatch[3], 10);

    if (isValidDate(year, month, day)) {
      return new CalendarDate(year, month, day);
    }
  }

  //  US format (MM/DD/YYYY or MM-DD-YYYY)
  const usMatch = trimmed.match(formats[2]);
  console.log('usMatch', usMatch);
  if (usMatch) {
    const month = parseInt(usMatch[1], 10);
    const day = parseInt(usMatch[2], 10);
    const year = parseInt(usMatch[3], 10);

    if (isValidDate(year, month, day)) {
      return new CalendarDate(year, month, day);
    }
  }

  return null;
};

const isValidDate = (year: number, month: number, day: number): boolean => {
  if (year < 1 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (month === 2 && isLeapYear) {
    return day <= 29;
  }

  return day <= daysInMonth[month - 1];
};

export interface DateInputProps extends Omit<RAC.DateInputProps, RemovedProps> {
  variant?: string;
  size?: string;
  action?: ReactElement<any>;
  onDatePaste?: (date: CalendarDate) => void;
}

const _DateInput = ({
  variant,
  size,
  action,
  onDatePaste,
  ...props
}: DateInputProps) => {
  const classNames = useClassNames({ component: 'DateField', variant, size });

  const ctx = useContext(DatePickerStateContext);

  const handlePaste = async (event: React.ClipboardEvent) => {
    if (!onDatePaste) return;
    try {
      const clipboardData = event.clipboardData.getData('text');

      const parsedDate = parseDateFromString(clipboardData);
      if (parsedDate) {
        event.preventDefault();
        onDatePaste(parsedDate);
        ctx?.setValue(parsedDate);
      }
    } catch (error) {
      console.warn('Failed to parse pasted date:', error);
    }
  };

  return (
    <Group className={classNames.field} onPaste={handlePaste}>
      <DateInput className="flex flex-1 items-center" {...props}>
        {segment => (
          <DateSegment className={classNames.segment} segment={segment} />
        )}
      </DateInput>
      {action ? action : null}
    </Group>
  );
};

export { _DateInput as DateInput };
