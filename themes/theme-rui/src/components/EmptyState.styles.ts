import { ThemeComponent, cva } from '@marigold/system';

export const EmptyState: ThemeComponent<'EmptyState'> = {
  container: cva({ base: ['mx-auto flex max-w-sm flex-col items-center p-6'] }),
  title: cva({ base: ['text-lg'] }),
  // `mt-1` pairs the description with the title (same 4px rhythm as the
  // SectionMessage/ContextualHelp descriptions); the action's `mt-6` keeps
  // the larger CTA spacing below.
  description: cva({ base: ['text-secondary mt-1 text-sm text-center'] }),
  action: cva({ base: ['mt-6'] }),
};
