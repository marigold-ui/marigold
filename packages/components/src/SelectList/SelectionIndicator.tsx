import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';

interface SelectionIndicatorProps {
  selectionMode: 'single' | 'multiple' | 'none';
  isSelected: boolean;
  isDisabled?: boolean;
  className?: string;
}

const RadioIndicator = ({
  isSelected,
  isDisabled,
}: Pick<SelectionIndicatorProps, 'isSelected' | 'isDisabled'>) => (
  <div
    aria-hidden="true"
    className={cn(
      'flex aspect-square size-4 shrink-0 items-center justify-center rounded-full p-1',
      'border-input shadow-elevation-border border',
      isSelected && 'border-brand bg-brand text-brand-foreground',
      isDisabled && isSelected && 'border-disabled! bg-disabled',
      isDisabled && 'cursor-not-allowed'
    )}
  >
    {isSelected ? <div className="size-full rounded-full bg-current" /> : null}
  </div>
);

export const SelectionIndicator = ({
  selectionMode,
  isSelected,
  isDisabled,
  className,
}: SelectionIndicatorProps) => {
  if (selectionMode === 'none') return null;

  return (
    <div className={className}>
      {selectionMode === 'multiple' ? (
        <Checkbox slot="selection" />
      ) : (
        <RadioIndicator isSelected={isSelected} isDisabled={isDisabled} />
      )}
    </div>
  );
};
