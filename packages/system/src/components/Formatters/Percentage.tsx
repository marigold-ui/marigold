import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface PercentageProps {
  value: number | bigint;
  wideDigits?: boolean;
}

export const Percentage = ({ value, wideDigits }: PercentageProps) => {
  const formatter = useNumberFormatter({
    style: 'percent',
  });
  return (
    <span className={wideDigits ? 'tabular-nums' : ''}>
      {formatter.format(value)}
    </span>
  );
};
