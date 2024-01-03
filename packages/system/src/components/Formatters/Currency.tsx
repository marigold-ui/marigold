import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface CurrencyProps {
  currency: string;
  value: number | bigint;
  fullDigitWidth?: boolean;
}

export const Currency = ({
  currency,
  value,
  fullDigitWidth,
}: CurrencyProps) => {
  const formatter = useNumberFormatter({
    style: 'currency',
    currency,
  });
  return (
    <span className={fullDigitWidth ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
