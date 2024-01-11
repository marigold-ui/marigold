import { useNumberFormatter } from '@react-aria/i18n';

interface NumericFormatProps extends Omit<Intl.NumberFormatOptions, 'style'> {
  value: number | bigint;
  numberingSystem?: string;
  wideDigits?: boolean;
  styleFormat?: string;
}

export const NumericFormat = ({
  value,
  styleFormat,
  wideDigits = true,
  ...props
}: NumericFormatProps) => {
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
