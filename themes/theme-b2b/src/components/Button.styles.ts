import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'rounded-xs border-none px-8 leading-[48px] h-component outline-hidden',
    'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1',
    'disabled:text-text-base-disabled disabled:bg-bg-base-disabled disabled:cursor-not-allowed',
    'pending:text-text-base-disabled pending:bg-bg-base-disabled pending:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        default: '',
        primary: [
          'text-text-inverted bg-bg-accent',
          'hover:bg-bg-accent-hover',
          'active:bg-bg-accent-active',
        ],
        secondary: [
          'text-text-inverted bg-bg-brand hover:bg-bg-brand-hover',
          'active:bg-bg-brand-active',
        ],
        ghost: [
          'border-border-base border border-solid',
          'text-text-base',
          'hover:bg-bg-brand-hover hover:text-text-inverted',
          'active:bg-bg-brand-active active:text-text-inverted',
        ],
        text: [
          'text-text-base hover:bg-bg-brand-hover hover:text-text-inverted active:bg-bg-brand-active active:text-text-inverted',
        ],
        icon: [
          'h-auto border-none bg-transparent px-0 leading-none',
          'disabled:bg-transparent',
        ],
      },
      size: {
        default: '',
        small: 'px-4 leading-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
