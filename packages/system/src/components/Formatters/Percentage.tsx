import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface PercentageProps {
  value: number | bigint;
}

export const Percentage = ({ value }: PercentageProps) => {
  const formatter = useNumberFormatter({
    style: 'percent',
  });
  return <span className="tabular-nums">{formatter.format(value)}</span>;
};
