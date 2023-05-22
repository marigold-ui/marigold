import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const inputHeight = 'h-[22px]';
export const inputBox = 'border rounded-sm border-input-border bg-white';
export const inputSpacing = 'px-1';

export const Input: ThemeComponent<'Input'> = {
  container: cva([
    inputBox,
    inputHeight, // makes sure that container will not grow larger than input
    'focus-within:outline-focus-bg focus-within:outline-2 focus-within:outline -outline-offset-1',
    '[&:has(input[disabled])]:bg-disabled-bg', // not using group-disabled/field here so it works without <FieldBase>
  ]),
  input: cva([
    inputHeight,
    'leading-[22px]',
    inputSpacing,
    'peer-data-[icon]:pl-6',
  ]),
  icon: cva('left-0.5 [&>*]:h-[18px] [&>*]:w-[18px]'),
};
