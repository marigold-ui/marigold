import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface NumericFormatProps extends Intl.NumberFormatOptions {
  value: number | bigint;
  numberingSystem?: string;
  tabular?: boolean;
}

export const NumericFormat = ({
  value,
  tabular = true,
  ...props
}: NumericFormatProps) => {
  const numberFormatter = useNumberFormatter({
    ...props,
  });
  return (
    <span className={tabular ? 'tabular-nums' : undefined}>
      {numberFormatter.format(value)}
    </span>
  );
};
