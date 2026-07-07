import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva({
  base: 'aria-[disabled]:cursor-not-allowed',
  variants: {
    variant: {
      default: 'text-link font-normal',
      secondary: 'font-medium text-foreground underline hover:no-underline',
      master: 'text-link font-normal inline-flex items-center ui-access-master',
      admin: 'text-link font-normal inline-flex items-center ui-access-admin',
    },
    size: {
      default: '',
      small: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
