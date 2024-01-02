import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

interface DateFormatterProps extends DateFormatterOptions {
  value: Date;
}

export const DateFormatter = ({ value, ...props }: DateFormatterProps) => {
  const formatter = useDateFormatter({
    ...props,
  });

  return <span className="tabular-nums">{formatter.format(value)}</span>;
};
