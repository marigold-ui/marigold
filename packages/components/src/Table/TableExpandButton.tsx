import { Button } from 'react-aria-components/Button';
import { MorphCaret } from '../icons/MorphCaret';
import { useTableContext } from './Context';

// Props
// ---------------
export interface TableExpandButtonProps {
  /** Whether the row this button belongs to is expanded. */
  expanded?: boolean;
}

// Component
// ---------------
/**
 * Expand/collapse control for a group row, rendered by `Table.Cell` in the tree
 * column.
 *
 * The `chevron` slot is what wires this up: react-aria supplies the press
 * handler, the localized "Expand"/"Collapse" label, and keeps the button out of
 * the tab order (you reach it by arrow-navigating to the row), so `Tab` stays
 * reserved for the row's own action buttons.
 */
export const TableExpandButton = ({ expanded }: TableExpandButtonProps) => {
  const { classNames } = useTableContext();

  return (
    <Button slot="chevron" className={classNames.expandButton}>
      {/* Same caret and morph as `Accordion`, so expanding reads as one system. */}
      <MorphCaret size="16" expanded={expanded} />
    </Button>
  );
};
