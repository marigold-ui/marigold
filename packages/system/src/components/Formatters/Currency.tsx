import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface CurrencyProps {
  currency: string;
  value: number | bigint;
}

export const Currency = ({ currency, value }: CurrencyProps) => {
  const formatter = useNumberFormatter({
    style: 'currency',
    currency,
  });
  return <span className="tabular-nums">{formatter.format(value)}</span>;
};
