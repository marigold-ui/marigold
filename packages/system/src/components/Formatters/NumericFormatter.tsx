import { useNumberFormatter } from '@react-aria/i18n';

interface NumericFormatterProps
  extends Omit<Intl.NumberFormatOptions, 'style'> {
  value: number | bigint;
  numberingSystem?: string;
  wideDigits?: boolean;
  styleFormat?: string;
}

export const NumericFormatter = ({
  value,
  styleFormat,
  wideDigits = true,
  ...props
}: NumericFormatterProps) => {
  const numberFormatter = useNumberFormatter({
    style: styleFormat,
    ...props,
  });
  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {numberFormatter.format(value)}
    </span>
  );
};
