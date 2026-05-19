/*
 * Type-level regression test for DSTSUP-253.
 *
 * Validates that `cva` results remain assignable to `ComponentStyleFunction`
 * (and therefore `ThemeComponent<...>`) — the canonical theming pattern
 * documented for consumers.
 *
 * This file is compiled via `tsconfig.types-test.json` with
 * `strictFunctionTypes: true` enabled, matching every consumer's default
 * `strict: true` configuration. The Marigold monorepo otherwise sets
 * `strictFunctionTypes: false` in its base config, which hides function-
 * parameter contravariance bugs.
 *
 * If `@marigold/system` ever ships a `ComponentStyleFunction` shape that the
 * current `cva` return type cannot satisfy under strict function checking,
 * this file fails to compile and the typecheck script breaks.
 */
import type { ThemeComponent } from '../types/theme';
import { cva } from '../utils/className.utils';

// Slot-less component (canonical pattern from the bug report)
export const Button: ThemeComponent<'Button'> = cva({
  base: 'foo',
  variants: {
    variant: { primary: 'p', secondary: 's' },
    size: { sm: 'sm', md: 'md' },
  },
});

// Slotted component
export const Tooltip: ThemeComponent<'Tooltip'> = {
  container: cva({
    base: 'bar',
    variants: {
      variant: { default: 'd', dark: 'dk' },
      size: { sm: 'sm', md: 'md' },
    },
  }),
  arrow: cva({ base: 'arrow' }),
};

// cva without variants/sizes
export const Divider: ThemeComponent<'Divider'> = cva({
  base: 'divider',
});
