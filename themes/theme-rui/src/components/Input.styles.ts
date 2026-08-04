import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Input: ThemeComponent<'Input'> = {
  input: cva({
    base: [
      'ui-control ui-input',
      'disabled:ui-state-disabled',
      'group-read-only/field:ui-state-readonly',
      'invalid:ui-state-error',
      'focus:ui-state-focus outline-none',
      'group-read-only/field:cursor-default',
      'group-data-icon/input:pl-8',
      // Reserve the control-sized action box so text never slides under it.
      'group-data-action/input:pr-control',

      // [type=file] styles
      '[&[type=file]]:cursor-pointer [&[type=file]]:border-solid [&[type=file]]:bg-surface [&[type=file]]:h-[calc(var(--spacing-control)-2px)] [&[type=file]]:pl-0 [&[type=file]]:pr-3 [&[type=file]]:italic [&[type=file]]:text-secondary',
      'file:cursor-pointer file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-border file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground',

      // [type-color] styles
      '[&[type=color]]:h-control',
      '[&::-webkit-color-swatch-wrapper]:p-0',
      '[&::-webkit-color-swatch]:p-2 [&::-moz-color-swatch]:p-2',
      '[&::-webkit-color-swatch]:rounded-[inherit] [&::-moz-color-swatch]:rounded-[inherit]',
      '[&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:border-0',
    ],
  }),
  icon: cva({
    base: [
      'pointer-events-none left-2.5 size-4',
      'text-secondary disabled:text-disabled',
    ],
  }),
  // A flush, control-sized centered box: any trailing action (icon button,
  // chevron, clear button, spinner) pins to the right edge and centers its
  // 16px icon at the same inset as the leading icon.
  action: cva({
    base: 'right-0 text-secondary flex size-control items-center justify-center',
  }),
};
