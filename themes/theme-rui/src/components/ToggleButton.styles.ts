import { ThemeComponent, cva } from '@marigold/system';
import { buttonBase } from './Button.styles';

export const ToggleButton: ThemeComponent<'ToggleButton'> = {
  group: cva('group inline-flex rounded-md shadow-sm', {
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
      'border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground',
      'selected:bg-input/50 selected:shadow-none',
      // Group-specific styles for ToggleButtonGroup
      'in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-l-0',
      'in-[.group]:first:rounded-l-md in-[.group]:first:border-l',
      'in-[.group]:last:rounded-r-md',
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
