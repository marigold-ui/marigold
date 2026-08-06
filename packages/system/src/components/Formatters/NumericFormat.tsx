import { useNumberFormatter } from '@react-aria/i18n';

export type NumerFormatterOptions = NonNullable<
  Parameters<typeof useNumberFormatter>[0]
>;

type StringNumericLiteral =
  `${number}` | 'Infinity' | '-Infinity' | '+Infinity';

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
    // Same reasoning as DateFormat: Intl output legitimately differs between
    // server and client (locale fallback plus Node-vs-browser ICU, which shows
    // up here as currency spacing and grouping separators). Suppressed globally
    // rather than behind a prop because the mismatch is the default for SSR
    // consumers who have not pinned a locale.
    //
    // Bounded, not blanket: the suppression works one level deep, covering this
    // span's attributes and its direct text child only. That child is entirely
    // formatter output. Wrapping the value in another element would move it out
    // from under the suppression.
    <span
      suppressHydrationWarning
      className={tabular ? 'tabular-nums' : undefined}
    >
      {Array.isArray(value)
        ? formatter.formatRange(value[0], value[1])
        : formatter.format(value)}
    </span>
  );
};
