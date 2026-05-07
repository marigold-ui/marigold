import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';

interface SelectionIndicatorProps {
  selectionMode: 'single' | 'multiple';
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
      'border-border shadow-elevation-border bg-surface border',
      isSelected &&
        'border-selected-bold bg-selected-bold text-selected-bold-foreground',
      isDisabled &&
        isSelected &&
        'border-disabled-surface! bg-disabled-surface',
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
