import { ThemeComponent, cva } from '@marigold/system';
import { buttonBase } from './Button.styles';

export const ToggleButton: ThemeComponent<'ToggleButton'> = {
  group: cva('group inline-flex ui-surface', {
    variants: {
      size: {
        default: 'text-sm',
        small: 'text-xs',
        icon: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  button: cva(
    [
      ...buttonBase,

      // ToggleButton-specific styles
      'ui-surface',
      'hover:[--ui-background-color:var(--color-hover)] hover:text-foreground',
      'disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)]',
      'selected:[--ui-background-color:var(--color-input)] selected:shadow-none',

      // Group-specific styles for ToggleButtonGroup
      'in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0',
      'in-[.group]:first:rounded-l-surface',
      'in-[.group]:last:rounded-r-surface in-[.group]:last:border-r-0',
    ],
    {
      variants: {
        size: {
          default: 'text-sm',
          small: 'text-xs',
          icon: '',
        },
      },
      defaultVariants: {
        size: 'default',
      },
      compoundVariants: [
        {
          size: 'default',
          class: 'h-button px-4 py-2 [&_svg]:size-4',
        },
        {
          size: 'small',
          class: 'h-button-small px-3 [&_svg]:size-3.5',
        },
        {
          size: 'icon',
          class: 'size-button [&_svg]:size-4',
        },
      ],
    }
  ),
};
