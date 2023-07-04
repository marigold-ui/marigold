import { ThemeComponent, cva } from '@marigold/system';

export const Message: ThemeComponent<'Message'> = {
  container: cva('relative w-full rounded-lg border p-4', {
    variants: {
      variant: {
        info: '',
      },
    },
  }),
  icon: cva(),
  title: cva(),
  content: cva(),
};

cva([
  '[&>svg]:text-foreground relative w-full rounded-lg border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
]);
