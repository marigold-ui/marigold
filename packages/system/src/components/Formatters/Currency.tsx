import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface CurrencyProps {
  currency: string;
  value: number | bigint;
  wideDigits?: boolean;
}

export const Currency = ({ currency, value, wideDigits }: CurrencyProps) => {
  const formatter = useNumberFormatter({
    style: 'currency',
    currency,
  });
  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
