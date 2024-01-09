import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

type RemoveProps = 'currency' | 'currencyDisplay' | 'currencySign' | 'style';

interface NumericProps extends Omit<Intl.NumberFormatOptions, RemoveProps> {
  value: number;
  wideDigits?: boolean;
  numberingSystem?: string;
  styleFormat?: 'unit' | 'compact' | 'decimal';
}

export const Numeric = ({
  value,
  wideDigits,
  styleFormat,
  ...props
}: NumericProps) => {
  const formatter = useNumberFormatter({
    style: styleFormat,
    ...props,
  });
  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
