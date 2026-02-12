import { useNumberFormatter } from '@react-aria/i18n';

export type NumerFormatterOptions = NonNullable<
  Parameters<typeof useNumberFormatter>[0]
>;

type StringNumericLiteral =
  | `${number}`
  | 'Infinity'
  | '-Infinity'
  | '+Infinity';

export interface NumericFormatProps extends NumerFormatterOptions {
  /**
   * Value to be formatted.
   */
  value:
    | number
    | bigint
    | StringNumericLiteral
    | [number, number]
    | [bigint, bigint]
    | [StringNumericLiteral, StringNumericLiteral];

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
  const formatter = useNumberFormatter({
    ...props,
  });
  return (
    <span className={tabular ? 'tabular-nums' : undefined}>
      {Array.isArray(value)
        ? formatter.formatRange(value[0], value[1])
        : formatter.format(value)}
    </span>
  );
};
