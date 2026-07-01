import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva({
  base: 'aria-[disabled]:cursor-not-allowed',
  variants: {
    variant: {
      default: 'text-link font-normal',
      secondary: 'font-medium text-foreground underline hover:no-underline',
      master:
        'text-link font-normal before:content-[""] before:inline-block before:size-4 before:mr-1 before:bg-access-master-foreground before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center] before:[mask-image:var(--access-mask-lock)]',
      admin:
        'text-link font-normal before:content-[""] before:inline-block before:size-4 before:mr-1 before:bg-access-admin-foreground before:[mask-size:contain] before:[mask-repeat:no-repeat] before:[mask-position:center] before:[mask-image:var(--access-mask-key)]',
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
