import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n';

export interface DateFormatProps extends DateFormatterOptions {
  /**
   * Value to be formatted.
   */
  value: Date | [Date, Date];
  /**
   * Specifies that the digits should take the full width.
   * @default true
   */
  tabular?: boolean;
}

export const DateFormat = ({ value, tabular, ...props }: DateFormatProps) => {
  const formatter = useDateFormatter({
    ...props,
  });

  return (
    // Intl output legitimately differs between server and client: react-aria
    // reads the locale from `navigator.language` in the browser but falls back
    // to en-US on the server unless an I18nProvider pins it, and Node's ICU can
    // disagree with the browser's even for the same locale (separators, spacing).
    // Suppressed here rather than behind an opt-in prop because the mismatch is
    // the default for any SSR consumer who has not pinned a locale — a prop
    // would only make each of them discover it the hard way.
    //
    // Bounded, not blanket: `suppressHydrationWarning` works one level deep, so
    // it covers this span's attributes and its direct text child and nothing
    // composed inside it. That child is entirely formatter output, which is
    // exactly what varies. Keep it that way — wrapping the value in another
    // element would move the real output out from under the suppression.
    <span suppressHydrationWarning className={tabular ? 'tabular-nums' : ''}>
      {Array.isArray(value)
        ? formatter.formatRange(value[0], value[1])
        : formatter.format(value)}
    </span>
  );
};
