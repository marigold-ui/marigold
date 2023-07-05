import { ThemeComponent, cva } from '@marigold/system';

export const Message: ThemeComponent<'Message'> = {
  container: cva('relative w-full rounded-lg border p-4 pl-11', {
    variants: {
      variant: {
        default: 'border-primary-950',
        info: 'border-border-info text-text-info bg-bg-info',
        warning: 'border-border-warning text-text-warning bg-bg-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  icon: cva('absolute left-3 top-3 h-6 w-6'),
  title: cva('mb-1 font-bold leading-none tracking-tight'),
  content: cva('text-sm [&_p]:leading-relaxed'),
};

cva([
  '[&>svg]:text-foreground relative w-full rounded-lg border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
]);
