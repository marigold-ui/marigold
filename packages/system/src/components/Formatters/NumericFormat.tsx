import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface NumericFormatProps extends Omit<Intl.NumberFormatOptions, 'style'> {
  value: number | bigint;
  numberingSystem?: string;
  tabular?: boolean;
  styleFormat?: string;
}

export const NumericFormat = ({
  value,
  styleFormat,
  tabular = true,
  ...props
}: NumericFormatProps) => {
  const numberFormatter = useNumberFormatter({
    style: styleFormat,
    ...props,
  });
  return (
    <span className={tabular ? 'tabular-nums' : ''}>
      {numberFormatter.format(value)}
    </span>
  );
};
