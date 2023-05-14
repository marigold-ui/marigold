import { Theme } from '@marigold/system';
import { cva } from 'class-variance-authority';

// 'justify-end mg-disabled:text-disabled-text aria-required:font-bold'
export const Label: Theme['components']['Label'] = cva(['row-span-2']);
