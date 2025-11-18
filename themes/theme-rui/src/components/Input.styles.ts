import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Input: ThemeComponent<'Input'> = {
  container: cva([
    'inline-flex w-full h-input',
    'surface has-default-state:elevation-raised',
    'disabled:state-disabled',
    'group-read-only/field:state-readonly',
    'has-invalid:surface-has-error',
    'has-focus:state-focus',
  ]),
  input: cva([
    'surface-input rounded-[inherit]',
    'group-read-only/field:cursor-default',
    'group-data-icon/input:pl-8',
    'group-data-action/input:pr-7',

    // [type=file] styles
    '[&[type=file]]:cursor-pointer [&[type=file]]:border-solid [&[type=file]]:bg-background [&[type=file]]:h-[calc(var(--spacing-input)-2px)] [&[type=file]]:pl-0 [&[type=file]]:pr-3 [&[type=file]]:italic [&[type=file]]:text-muted-foreground/70',
    'file:cursor-pointer file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground',

    // [type-color] styles
    '[&[type=color]]:h-input',
    '[&::-webkit-color-swatch-wrapper]:p-0',
    '[&::-webkit-color-swatch]:p-2 [&::-moz-color-swatch]:p-2',
    '[&::-webkit-color-swatch]:rounded-[inherit] [&::-moz-color-swatch]:rounded-[inherit]',
    '[&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:border-0',
  ]),
  icon: cva([
    'pointer-events-none left-2',
    'text-muted-foreground disabled:text-disabled-foreground',
    'disabled:text-gray-50',
  ]),
  action: cva(['text-muted-foreground pr-1']),
};
