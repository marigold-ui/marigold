import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface PercentageProps {
  value: number | bigint;
  fullDigitWidth?: boolean;
}

export const Percentage = ({ value, fullDigitWidth }: PercentageProps) => {
  const formatter = useNumberFormatter({
    style: 'percent',
  });
  return (
    <span className={fullDigitWidth ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
