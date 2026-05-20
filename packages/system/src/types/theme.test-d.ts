/*
 * Type-level regression test for DSTSUP-253.
 *
 * Validates that `cva` results remain assignable to `ComponentStyleFunction`
 * (and therefore `ThemeComponent<...>`) under TypeScript's default
 * `strict: true` — i.e. every external consumer's settings.
 *
 * The Marigold monorepo sets `strictFunctionTypes: false` in its base
 * tsconfig, so a direct function assignment would be checked bivariantly and
 * the regression wouldn't surface here. `StrictlyAssignable` performs the
 * same parameter-contravariance / return-covariance check at the type level
 * via conditional `extends`, which always uses structural assignability
 * regardless of the compiler's `strictFunctionTypes` setting. So this file
 * is picked up by the regular `pnpm typecheck` — no separate tsconfig or CI
 * step required.
 */
import { cva } from '../utils/className.utils';
import type { ThemeComponent } from './theme';

// Strict-mode function assignability: `Source` ↦ `Target` requires
// `Target`'s parameters to be assignable to `Source`'s (contravariance) and
// `Source`'s return to be assignable to `Target`'s (covariance). Tuple
// wrappers prevent distribution over unions.
type StrictlyAssignable<
  Source extends (...args: any) => any,
  Target extends (...args: any) => any,
> = [Parameters<Target>[0]] extends [Parameters<Source>[0]]
  ? [ReturnType<Source>] extends [ReturnType<Target>]
    ? true
    : false
  : false;

type Expect<T extends true> = T;

// Slot-less component (canonical pattern from the bug report).
const ButtonStyles = cva({
  base: 'foo',
  variants: {
    variant: { primary: 'p', secondary: 's' },
    size: { sm: 'sm', md: 'md' },
  },
});
export const Button: ThemeComponent<'Button'> = ButtonStyles;

// Slotted component.
const TooltipContainer = cva({
  base: 'bar',
  variants: {
    variant: { default: 'd', dark: 'dk' },
    size: { sm: 'sm', md: 'md' },
  },
});
export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: TooltipContainer,
  arrow: cva({ base: 'arrow' }),
};

// `cva` without variants/sizes.
const DividerStyles = cva({ base: 'divider' });
export const Divider: ThemeComponent<'Divider'> = DividerStyles;

// Each tuple slot fails to compile (`'false' does not satisfy 'true'`) if the
// corresponding `cva` return is not strict-mode-assignable to its theme
// slot. Exported so `noUnusedLocals` accepts the file.
export type _StrictAssignabilityRegression = [
  Expect<StrictlyAssignable<typeof ButtonStyles, ThemeComponent<'Button'>>>,
  Expect<
    StrictlyAssignable<
      typeof TooltipContainer,
      ThemeComponent<'Tooltip'>['container']
    >
  >,
  Expect<StrictlyAssignable<typeof DividerStyles, ThemeComponent<'Divider'>>>,
];
