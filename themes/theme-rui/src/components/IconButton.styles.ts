import { ThemeComponent, cva } from '@marigold/system';

export const IconButton: ThemeComponent<'IconButton'> = cva({
  variants: {
    variant: {
      navigation:
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 outline-ring/30 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-current/8 h-9 py-2 gap-1 px-2.5',
    },
  },
});
