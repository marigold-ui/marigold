import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

interface DateFormatProps extends DateFormatterOptions {
  /**
   * Value to be formatted.
   */
  value: Date | [Date, Date];
  /**
   * Specifies that the digits should take the full width.
   * @default true
   */
  tabular?: boolean;
}

export const DateFormat = ({ value, tabular, ...props }: DateFormatProps) => {
  const formatter = useDateFormatter({
    ...props,
  });

  return (
    <span className={tabular ? 'tabular-nums' : ''}>
      {Array.isArray(value)
        ? formatter.formatRange(value[0], value[1])
        : formatter.format(value)}
    </span>
  );
};
