import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'border-border-base bg-bg-inverted text-text-base ease-ease-out h-6 cursor-pointer rounded-sm border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
    'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed',
    'outline-outline-focus outline-2 outline-offset-1 focus-visible:outline',
    'hover:bg-bg-inverted-hover',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-brand bg-bg-brand text-text-inverted',
          'hover:bg-bg-brand-hover hover:border-border-brand-hover ',
        ],
        link: [
          'text-text-link-hover h-auto border-none bg-transparent px-0 text-[13px] leading-none',
          'hover:bg-transparent hover:underline',
        ],
        text: [
          'h-auto border-none bg-transparent',
          'hover:bg-bg-inverted-hover',
        ],
        icon: [
          'h-auto border-none bg-transparent px-0 leading-none text-inherit',
        ],
      },
      size: {
        small: 'py-1',
      },
    },
  }
);
