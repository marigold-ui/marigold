import type { ReactNode } from 'react';

/**
 * Wrapper for a decoration rendered inside a boolean field's label — the
 * `labelAdornment` of `Checkbox`, `Radio` and `Switch`.
 *
 * All three anchor their control to the **first line** of the label, so the
 * label's first line box has to stay exactly one line tall. A decoration
 * dropped straight into that line does not: a default `Badge` is 20px against
 * a 16px line, which inflates the line and leaves the control sitting above
 * its optical centre (DST-1607).
 *
 * This wrapper takes the line's height (`1lh`, so it tracks whatever
 * line-height the theme gives the label) and centres the decoration inside it.
 * A decoration that fits — `Badge size="inline"`, a 16px icon — lands dead on
 * the line. A taller one overflows symmetrically instead of pushing the line
 * apart, so the control stays put either way.
 *
 * The classes live here rather than in a theme file on purpose: this is the
 * guardrail, and a theme must not be able to reopen the bug.
 */
export const LabelAdornment = ({ children }: { children?: ReactNode }) => (
  <span className="inline-flex h-[1lh] shrink-0 items-center">{children}</span>
);
