import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

// 'justify-end mg-disabled:text-disabled-text aria-required:font-bold'
export const Label: ThemeComponent<'Label'> = cva(['row-span-2 justify-end']);
