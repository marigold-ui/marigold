import { ThemeComponent, cva } from '@marigold/system';

export const MultiSelect: ThemeComponent<'MultiSelect'> = {
  field: cva('space-y-2'),
  container: cva([
    'bg-background shadow-xs border',
    'px-3 text-sm text-foreground transition-shadow',
    'border border-input rounded-lg outline-hidden',
    'aria-disabled:bg-disabled aria-disabled:text-disabled-foreground aria-disabled:hover:border-input aria-disabled:border-input aria-disabled:cursor-not-allowed',
    'has-[input[data-invalid=true]]:border-destructive has-[input[data-invalid=true][data-focused=true]]:!border-destructive has-[input[data-invalid=true][data-focused=true]]:!ring-destructive/20',
    'has-[input[data-focused=true]]:!border-ring has-[input[data-focused=true]]:!ring-ring/50 has-[input[data-focused=true]]:ring-[3px] has-[input[data-focused=true]]:!outline-none',
    'has-[input[aria-readonly=true]]:bg-muted',
    'min-h-input',
  ]),

  input: cva([
    'bg-transparent flex-1 h-full',
    'leading-loose',
    'data-[focused]:outline-hidden outline-hidden border-0',
    'disabled:cursor-not-allowed',
    'group-data-[icon]/input:pl-5',
    'group-data-[action]/input:pr-8',
    'placeholder:text-placeholder',
  ]),

  tag: cva([
    'border border-solid border-input rounded-md',
    'bg-background',
    'font-medium text-xs',
    'flex items-center gap-1 ',
    'h-7 px-2 cursor-default',
  ]),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
  icon: cva('left-1'),
  listContainer: cva(['surface shadow-elevation-overlay mt-0.5 outline-0']),
  list: cva('pointer-events-auto space-y-1 p-1'),
  option: cva([
    'text-sm text-foreground',
    'flex flex-col',
    'cursor-pointer p-2 outline-hidden',
    '[&.isFocused:not([aria-disabled=true])]:!text-foreground [&.isFocused[aria-disabled=true]]:bg-transparent',
    'aria-disabled:text-disabled-foreground aria-disabled:cursor-not-allowed',
    '[&.isFocused:not([aria-disabled=true])]:!bg-hover',
  ]),
  valueContainer: cva('gap-2'),
};
