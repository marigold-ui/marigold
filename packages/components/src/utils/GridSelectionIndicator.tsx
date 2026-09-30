import type { SelectionMode } from '@react-types/shared';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';

// The selection mark for a GridListItem-backed row, shared by SelectList and ListView.

interface GridSelectionIndicatorProps {
  selectionMode: SelectionMode;
  isSelected: boolean;
  isDisabled?: boolean;
  className?: string;
  /** Names the cell in a caller whose grid uses named areas. */
  gridArea?: string;
}

const RadioIndicator = ({
  isSelected,
  isDisabled,
}: Pick<GridSelectionIndicatorProps, 'isSelected' | 'isDisabled'>) => (
  <div
    aria-hidden="true"
    className={cn(
      'flex aspect-square size-4 shrink-0 items-center justify-center rounded-full p-1',
      // The same edge a real Radio draws, so switching a list between `single`
      // and `multiple` cannot change the weight of its mark. No hover step
      // though: the row is the click target and already carries its own.
      'border-control-edge bg-surface border',
      isSelected &&
        'border-selected-bold bg-selected-bold text-selected-bold-foreground',
      // Dim on `disabled` alone, like a real control. Only the fill and the
      // dot are selection-specific.
      isDisabled && 'border-control-edge-disabled! cursor-not-allowed',
      // `text-disabled` last, so it outranks the `selected` ink above: the dot
      // is `bg-current`, and `selected-bold-foreground` on `disabled-surface`
      // measures 1.06:1.
      isDisabled && isSelected && 'bg-disabled-surface text-disabled'
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
  gridArea,
}: GridSelectionIndicatorProps) => {
  // Nothing, not an empty wrapper: the cell's own spacing would still apply.
  if (selectionMode === 'none') {
    return null;
  }

  return (
    <div className={className} data-grid-area={gridArea}>
      {selectionMode === 'multiple' ? (
        <Checkbox slot="selection" />
      ) : (
        <RadioIndicator isSelected={isSelected} isDisabled={isDisabled} />
      )}
    </div>
  );
};
