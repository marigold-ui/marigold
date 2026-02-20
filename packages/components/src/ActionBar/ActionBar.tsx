import type { ReactNode } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { Text } from '../Text/Text';
import { intlMessages } from '../intl/messages';
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
   * Handler that is called when the ActionBar clear button is pressed.
   */
  onClearSelection?: () => void;

  /**
   * The number of selected items that the ActionBar is currently linked to.
   * If 0, the ActionBar is hidden.
   * @default 0
   */
  selectedItemCount?: number | 'all';

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
  onClearSelection,
  selectedItemCount = 0,
  variant,
  size,
}: ActionBarProps) => {
  const classNames = useClassNames({
    component: 'ActionBar',
    variant,
    size,
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // Hide ActionBar when no items are selected
  const isHidden = selectedItemCount === 0;

  const countText =
    selectedItemCount === 'all'
      ? stringFormatter.format('allItemsSelected')
      : stringFormatter.format('selectedCount', { count: selectedItemCount });

  if (isHidden) {
    return null;
  }

  return (
    <div
      id={id}
      className={cn('z-30', classNames.container)}
      role="toolbar"
      aria-label={stringFormatter.format('bulkActionsAriaLabel')}
    >
      <div className={classNames.count}>
        <Text>{countText}</Text>
      </div>

      <div className={classNames.actions}>{children}</div>

      {onClearSelection && (
        <CloseButton
          aria-label={stringFormatter.format('clearSelectionAriaLabel')}
          onPress={onClearSelection}
          className={classNames.clearButton}
        />
      )}
    </div>
  );
};

ActionBar.Button = ActionButton;
