import { cva } from 'class-variance-authority';

const inputHeight = 'h-[22px]';

export const Input = {
  container: cva([
    'border rounded-sm border-input-border bg-white',
    'focus-within:outline-focus-bg focus-within:outline-2 focus-within:outline -outline-offset-1',
    '[&:has(input[disabled])]:bg-disabled-bg', // not using group-disabled/field here so it works without <FieldBase>
    inputHeight, // makes sure that container will not grow larger than input
  ]),
  input: cva([`${inputHeight} leading-[22px]`, 'px-2 peer-data-[icon]:pl-6']),
  icon: cva('left-0.5 [&>*]:h-[18px] [&>*]:w-[18px]'),
};
