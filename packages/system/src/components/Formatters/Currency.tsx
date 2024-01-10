import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface CurrencyProps extends Omit<Intl.NumberFormatOptions, 'style'> {
  value: number | bigint;
  wideDigits?: boolean;
}

export const Currency = ({ value, wideDigits, ...props }: CurrencyProps) => {
  const formatter = useNumberFormatter({
    style: 'currency',
    ...props,
  });
  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
