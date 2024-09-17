import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(['font-medium'], {
  variants: {
    variant: {
      default: 'underline underline-offset-4',
      primary: 'bg-text-primary text-white',
      secondary: 'border-text-primary border-2',
      toc: [
        'text-secondary-500 hover:text-secondary-800 text-xs',
        'data-[active=true]:text-secondary-800 font-normal data-[active=true]:font-medium',
      ],
      cta: [
        'h-component rounded-2xl bg-purple-700 px-5 py-1.5',
        'text-sm font-semibold text-purple-100',
        'transition-all hover:bg-purple-600',
      ],
    },
    size: {
      inline: '',
      small: 'px-3 py-1.5 text-sm',
      regular: 'px-3 py-2 rounded',
      large: 'px-8 py-2.5 rounded',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'inline',
  },
});
