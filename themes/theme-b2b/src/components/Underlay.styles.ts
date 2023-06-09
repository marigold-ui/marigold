import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Underlay: ThemeComponent<'Underlay'> = cva(
  ' bg-bg-surface-underlay blur-[1]'
);
