import { Theme } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Label: Theme['components']['Label'] = cva(
  'justify-end mg-disabled:text-disabled-text aria-required:font-bold'
);
