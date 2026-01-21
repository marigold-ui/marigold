import type { ReactNode, RefObject } from 'react';
import { useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { Text } from '../Text/Text';
import { ActionButton } from './ActionButton';

export interface ActionBarProps {
  /**
   * A list of ActionButtons to display.
   */
  children?: ReactNode;

  /**
   * The element's unique identifier.
   */
  id?: string;

  /**
   * Whether the ActionBar should be displayed with an emphasized style.
   * @default false
   */
  isEmphasized?: boolean;

  /**
   * Handler that is called when the ActionBar clear button is pressed.
   */
  onClearSelection?: () => void;

  /**
   * A ref to the scrollable element the ActionBar appears above.
   */
  scrollRef?: RefObject<HTMLElement | null>;

  /**
   * The number of selected items that the ActionBar is currently linked to.
   * If 0, the ActionBar is hidden.
   * @default 0
   */
  selectedItemCount?: number | 'all';

  /**
   * A slot name for the component.
   */
  slot?: string | null;

  /**
   * Variant of the ActionBar.
   */
  variant?: string;

  /**
   * Size of the ActionBar.
   */
  size?: string;
}

export const ActionBar = ({
  children,
  id,
  isEmphasized,
  onClearSelection,
  scrollRef,
  selectedItemCount = 0,
  slot,
  variant,
  size,
}: ActionBarProps) => {
  const classNames = useClassNames({
    component: 'ActionBar',
    variant,
    size,
  });

  // Hide ActionBar when no items are selected
  const isHidden = selectedItemCount === 0;

  const countText =
    selectedItemCount === 'all'
      ? 'All items selected'
      : `${selectedItemCount} selected`;

  if (isHidden) {
    return null;
  }

  return (
    <div
      id={id}
      slot={slot ?? undefined}
      data-emphasized={isEmphasized || undefined}
      className={classNames.container}
      role="toolbar"
      aria-label="Bulk actions"
    >
      <div className={classNames.count}>
        <Text>{countText}</Text>
      </div>

      <div className={classNames.actions}>{children}</div>

      {onClearSelection && (
        <CloseButton
          aria-label="Clear selection"
          onPress={onClearSelection}
          className={classNames.clearButton}
        />
      )}
    </div>
  );
};

ActionBar.Button = ActionButton;
