import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-none disabled:cursor-not-allowed',
    'pending:text-disabled-foreground pending:bg-disabled pending:cursor-not-allowed pending:border-none',
  ],
  {
    variants: {
      variant: {
        default:
          'border border-input bg-background shadow-sm shadow-black/5 hover:bg-hover hover:text-foreground',
        primary:
          'bg-brand text-brand-foreground shadow-sm shadow-black/5 hover:bg-brand/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-hover hover:text-foreground',
        // only used for calendar in MonthListBox and YearListBox to have a hover over other options
        // TODO: Remove this in future and rethink the MonthListBox and YearListBox or use another variant
        text: 'hover:bg-hover',
      },
      size: {
        default: 'h-button px-4 py-2',
        small: 'h-button-small px-3 text-xs',
        large: 'h-button-large px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
