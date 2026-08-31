import type { SelectionMode } from '@react-types/shared';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';

// The selection mark for a GridListItem-backed row, shared by SelectList and ListView.

interface GridSelectionIndicatorProps {
  selectionMode: SelectionMode;
  isSelected: boolean;
  isDisabled?: boolean;
  className?: string;
}

const RadioIndicator = ({
  isSelected,
  isDisabled,
}: Pick<GridSelectionIndicatorProps, 'isSelected' | 'isDisabled'>) => (
  <div
    aria-hidden="true"
    className={cn(
      'flex aspect-square size-4 shrink-0 items-center justify-center rounded-full p-1',
      'border-border bg-surface border',
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

export const GridSelectionIndicator = ({
  selectionMode,
  isSelected,
  isDisabled,
  className,
}: GridSelectionIndicatorProps) => {
  // Nothing, not an empty wrapper: the cell's own spacing would still apply.
  if (selectionMode === 'none') {
    return null;
  }

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
