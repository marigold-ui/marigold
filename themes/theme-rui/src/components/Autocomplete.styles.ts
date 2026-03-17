import { type ThemeComponent, cva } from '@marigold/system';

export const Autocomplete: ThemeComponent<'Autocomplete'> = {
  mobileTrigger: cva({ base: 'group/input relative flex items-center' }),
};
