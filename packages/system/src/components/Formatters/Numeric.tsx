import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

type RemoveProps = 'currency' | 'currencyDisplay' | 'currencySign' | 'style';

interface NumericProps extends Omit<Intl.NumberFormatOptions, RemoveProps> {
  value: number;
  fullDigitWidth?: boolean;
  numberingSystem?: string;
  styleFormat?: 'unit' | 'compact' | 'decimal';
}

export const Numeric = ({
  value,
  fullDigitWidth,
  styleFormat,
  ...props
}: NumericProps) => {
  const formatter = useNumberFormatter({
    style: styleFormat,
    ...props,
  });
  return (
    <span className={fullDigitWidth ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
