import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva({
  base: 'bg-bg-underlay/50 backdrop-blur-xs',
});
