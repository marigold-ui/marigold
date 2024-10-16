import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(['font-medium'], {
  variants: {
    variant: {
      default: 'underline underline-offset-4',
      primary: 'bg-text-primary text-white leading-none',
      secondary: 'border-text-primary border-2 leading-none',
      toc: [
        'text-secondary-500 hover:text-secondary-800 text-xs',
        'data-[active=true]:text-secondary-800 font-normal data-[active=true]:font-medium',
      ],
      cta: [
        'h-component rounded-2xl bg-purple-700 px-5 py-1.5',
        'text-sm font-semibold text-purple-100',
        'transition-all hover:bg-purple-600',
      ],
      ghost: 'hover:underline underline-offset-4',
    },
    size: {
      inline: '',
      small: 'px-3 py-1.5 text-sm rounded',
      regular: 'px-3 py-2 rounded',
      large: 'px-8 py-3.5 rounded',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'inline',
  },
});
