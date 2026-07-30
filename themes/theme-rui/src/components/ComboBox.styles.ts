import { type ThemeComponent, cva } from '@marigold/system';

export const ComboBox: ThemeComponent<'ComboBox'> = {
  icon: cva({ base: 'text-secondary/80' }),
  mobileTrigger: cva({ base: 'group/input relative flex items-center' }),
};
