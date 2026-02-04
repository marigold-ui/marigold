import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva({
  base: ['font-medium'],
  variants: {
    variant: {
      default:
        'underline underline-offset-4 transition-all hover:text-slate-700',
      primary:
        'bg-text-primary text-white leading-none hover:bg-slate-700 transition-all',
      secondary: 'border-text-primary border-2 leading-none hover:bg-slate-100',
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
      shiny:
        'border border-slate-200 bg-slate-100 hover:bg-slate-200 transition-all ease-in',
    },
    size: {
      inline: '',
      xsmall: 'rounded-full text-xs py-1.5 px-4',
      small: 'px-3 py-1.5 text-sm rounded-xs',
      regular: 'px-3 py-2 rounded-xs',
      large: 'px-8 py-3.5 rounded-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'inline',
  },
});
