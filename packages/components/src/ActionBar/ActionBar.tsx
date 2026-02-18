import type {
  ForwardRefExoticComponent,
  KeyboardEvent,
  ReactNode,
} from 'react';
import { forwardRef, useRef, useState } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useEnterAnimation, useExitAnimation } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { Text } from '../Text/Text';
import { intlMessages } from '../intl/messages';
import { useActionBarContext } from './ActionBarContext';
import { ActionButton } from './ActionButton';
import type { ActionButtonProps } from './ActionButton';

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

interface ActionBarComponent extends ForwardRefExoticComponent<
  ActionBarProps & React.RefAttributes<HTMLDivElement>
> {
  Button: typeof ActionButton;
}

const _ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      children,
      id,
      onClearSelection: onClearSelectionProp,
      selectedItemCount: selectedItemCountProp,
      variant,
      size,
    },
    forwardedRef
  ) => {
    const context = useActionBarContext();
    const selectedItemCount =
      selectedItemCountProp ?? context?.selectedItemCount ?? 0;
    const onClearSelection = onClearSelectionProp ?? context?.onClearSelection;

    const classNames = useClassNames({
      component: 'ActionBar',
      variant,
      size,
    });
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    // Internal ref for animations (forwarded ref may be null)
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef ??
      internalRef) as React.RefObject<HTMLDivElement | null>;

    const isOpen = selectedItemCount !== 0;
    const isExiting = useExitAnimation(ref, isOpen);
    const isEntering = useEnterAnimation(ref);

    // Retain last count so we don't flash "0 selected" during exit animation
    const [lastCount, setLastCount] = useState(selectedItemCount);
    if (selectedItemCount !== 0 && selectedItemCount !== lastCount) {
      setLastCount(selectedItemCount);
    }

    // Nothing to render
    if (!isOpen && !isExiting) {
      return null;
    }

    const countText =
      lastCount === 'all' ? 'All items selected' : `${lastCount} selected`;

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && onClearSelection) {
        e.preventDefault();
        onClearSelection();
      }
    };

    return (
      <FocusScope restoreFocus>
        <div
          ref={ref}
          id={id}
          className={cn('z-30', classNames.container)}
          role="toolbar"
          aria-label={stringFormatter.format('bulkActionsAriaLabel')}
          onKeyDown={handleKeyDown}
          data-entering={isEntering || undefined}
          data-exiting={isExiting || undefined}
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

        {/* Screen reader announcement when ActionBar appears */}
        {!isExiting && (
          <div className="sr-only" role="status" aria-live="polite">
            {stringFormatter.format('actionsAvailable')}
          </div>
        )}
      </FocusScope>
    );
  }
);

const ActionBar = _ActionBar as ActionBarComponent;
ActionBar.Button = ActionButton;

export { ActionBar };
export type { ActionButtonProps };
