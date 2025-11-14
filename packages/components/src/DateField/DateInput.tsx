import { CalendarDate } from '@internationalized/date';
import { ReactElement } from 'react';
import type RAC from 'react-aria-components';
import { DateInput, Group } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { DateSegment } from './DateSegment';

type RemovedProps = 'style' | 'className' | 'children';

interface ParsedDate {
  year: number;
  month: number;
  day: number;
}

const extractCalendarDate = (
  format: RegExp,
  order: string[],
  dateString: string
): CalendarDate | undefined => {
  const trimmed = dateString.trim();
  const isMatch = trimmed.match(format);

  if (!isMatch) return;

  const date = order.reduce((accumulatedValue, currentVal, currentIndex) => {
    return {
      ...accumulatedValue,
      [currentVal]: parseInt(isMatch[currentIndex + 1], 10),
    };
  }, {} as ParsedDate);

  if (isValidDate(date.year, date.month, date.day)) {
    return new CalendarDate(date.year, date.month, date.day);
  }
};

const parseDateFromString = (dateString: string): CalendarDate | undefined => {
  const formats = [
    // ISO format: YYYY-MM-DD
    { regex: /^(\d{4})-(\d{1,2})-(\d{1,2})$/, order: ['year', 'month', 'day'] },
    // European format: DD.MM.YYYY or DD/MM/YYYY
    {
      regex: /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/,
      order: ['day', 'month', 'year'],
    },
    // US format: MM/DD/YYYY or MM-DD-YYYY
    {
      regex: /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/,
      order: ['month', 'day', 'year'],
    },
  ];

  for (const format of formats) {
    const result = extractCalendarDate(format.regex, format.order, dateString);
    if (result) return result;
  }

  return undefined;
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
  onPaste: (date: CalendarDate) => void;
}

const _DateInput = ({
  variant,
  size,
  action,
  onPaste,
  ...props
}: DateInputProps) => {
  const classNames = useClassNames({ component: 'DateField', variant, size });

  const handlePaste = async (event: React.ClipboardEvent) => {
    try {
      const clipboardData = event.clipboardData.getData('text');

      const parsedDate = parseDateFromString(clipboardData);
      if (parsedDate) {
        event.preventDefault();
        onPaste(parsedDate);
      }
    } catch (error) {
      console.warn('Failed to parse pasted date:', error);
    }
  };

  return (
    <Group className={classNames.field} onPaste={handlePaste}>
      <DateInput
        className={cn('flex flex-1 items-center', classNames.input)}
        {...props}
      >
        {segment => (
          <DateSegment className={classNames.segment} segment={segment} />
        )}
      </DateInput>
      {action ? action : null}
    </Group>
  );
};

export { _DateInput as DateInput };
