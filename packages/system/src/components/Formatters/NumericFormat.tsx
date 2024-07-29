import React from 'react';

import { useNumberFormatter } from '@react-aria/i18n';

interface NumericFormatProps extends Intl.NumberFormatOptions {
  /**
   * Value to be formatted.
   */
  value: number | bigint;
  /**
   * The numberingSystem accessor property of Intl.Locale instances returns the numeral system for this locale.
   */
  numberingSystem?: string;
  /**
   * Specifies that the digits should take the full width.
   * @default true
   */
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
