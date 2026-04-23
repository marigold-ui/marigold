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
    data-selected={isSelected || undefined}
    className={cn(
      'flex size-4 shrink-0 items-center justify-center rounded-full border p-0.5',
      'border-input shadow-elevation-border',
      'data-selected:border-brand data-selected:bg-brand',
      isDisabled && 'opacity-50'
    )}
  >
    {isSelected ? (
      <div className="bg-brand-foreground size-full rounded-full" />
    ) : null}
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
