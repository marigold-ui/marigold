import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva({
  base: 'aria-[disabled]:cursor-not-allowed',
  variants: {
    variant: {
      default: 'text-link font-normal',
      secondary: 'font-medium text-foreground underline hover:no-underline',
      master:
        'text-link font-normal inline-flex items-center before:content-[""] before:size-4 before:shrink-0 before:mr-1 before:bg-access-master-foreground before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center] before:[mask-image:var(--access-mask-lock)]',
      admin:
        'text-link font-normal inline-flex items-center before:content-[""] before:size-4 before:shrink-0 before:mr-1 before:bg-access-admin-foreground before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center] before:[mask-image:var(--access-mask-key)]',
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
