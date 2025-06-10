import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow]',
    '[&_svg]:shrink-0',
    'focus-visible:util-focus-ring outline-none disabled:util-disabled',
    'pending:text-disabled-foreground pending:bg-disabled pending:cursor-not-allowed pending:border-none',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-foreground shadow-sm shadow-black/5 hover:bg-brand/90',
        secondary:
          'border border-input bg-background shadow-sm shadow-black/5 hover:bg-hover hover:text-foreground expanded:bg-hover',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-hover hover:text-foreground',
        // only used for calendar in MonthListBox and YearListBox to have a hover over other options
        // TODO: Remove this in future and rethink the MonthListBox and YearListBox or use another variant
        text: 'hover:bg-hover',
      },
      size: {
        default: 'h-button px-4 py-2 [&_svg]:size-4',
        small: 'h-button-small px-3 text-xs [&_svg]:size-3.5',
        large: 'h-button-large px-8 [&_svg]:size-5',
        icon: 'size-button [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
    },
  }
);
