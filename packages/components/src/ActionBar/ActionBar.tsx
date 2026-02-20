import { motion } from 'motion/react';
import type { ForwardRefExoticComponent, ReactNode } from 'react';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { Toolbar } from 'react-aria-components';
import { FocusScope } from '@react-aria/focus';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useKeyboard } from '@react-aria/interactions';
import { useIsSSR } from '@react-aria/ssr';
import {
  useEnterAnimation,
  useExitAnimation,
  useResizeObserver,
} from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
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

// Inner
// ---------------
interface ActionBarInnerProps {
  id?: string;
  children?: ReactNode;
  onClearSelection?: () => void;
  lastCount: number | 'all';
  isExiting: boolean;
  variant?: string;
  size?: string;
}

const ActionBarInner = forwardRef<HTMLDivElement, ActionBarInnerProps>(
  (
    { id, children, onClearSelection, lastCount, isExiting, variant, size },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef ??
      internalRef) as React.RefObject<HTMLDivElement | null>;
    const isEntering = useEnterAnimation(ref);

    const classNames = useClassNames({
      component: 'ActionBar',
      variant,
      size,
    });
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    const {
      keyboardProps: { onKeyDown, onKeyUp },
    } = useKeyboard({
      onKeyDown: e => {
        if (e.key === 'Escape' && onClearSelection) {
          e.preventDefault();
          onClearSelection();
        }
      },
    });

    return (
      <FocusScope restoreFocus>
        <motion.div
          layout
          ref={ref}
          id={id}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          className={cn(classNames.container, 'sticky z-30 mx-auto w-max')}
          style={{
            bottom: 'var(--actionbar-offset, 8px)',
          }}
          transition={{
            layout: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 },
          }}
          data-entering={isEntering || undefined}
          data-exiting={isExiting || undefined}
        >
          <div className={classNames.selection}>
            {onClearSelection && (
              <CloseButton
                aria-label={stringFormatter.format('clearSelectionAriaLabel')}
                onPress={onClearSelection}
                className={classNames.clearButton}
              />
            )}

            <div className={classNames.count}>
              {lastCount === 'all'
                ? stringFormatter.format('selectedAll')
                : stringFormatter.format('selectedCount', {
                    count: lastCount,
                  })}
            </div>
          </div>

          <Toolbar
            className={classNames.toolbar}
            aria-label={stringFormatter.format('bulkActionsAriaLabel')}
          >
            {children}
          </Toolbar>
        </motion.div>

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

// Outer
// ---------------
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
    const onHeightChange = context?.onHeightChange;
    const isSSR = useIsSSR();

    // Internal ref for exit animation
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef ??
      internalRef) as React.RefObject<HTMLDivElement | null>;

    const isOpen = selectedItemCount !== 0;
    const isExiting = useExitAnimation(ref, isOpen);
    const shouldRender = !isSSR && (isOpen || isExiting);

    // Report measured height back to useActionBar via context
    useResizeObserver({
      ref,
      onResize: () => {
        onHeightChange?.(ref.current?.offsetHeight ?? 0);
      },
    });

    useLayoutEffect(() => {
      if (shouldRender) return;
      onHeightChange?.(0);
    }, [shouldRender, onHeightChange]);

    // Retain last count so we don't flash "0 selected" during exit animation
    const [lastCount, setLastCount] = useState(selectedItemCount);
    if (selectedItemCount !== 0 && selectedItemCount !== lastCount) {
      setLastCount(selectedItemCount);
    }

    // Nothing to render
    if (!shouldRender) {
      return null;
    }

    return (
      <ActionBarInner
        ref={ref}
        id={id}
        onClearSelection={onClearSelection}
        lastCount={lastCount}
        isExiting={isExiting}
        variant={variant}
        size={size}
      >
        {children}
      </ActionBarInner>
    );
  }
);

const ActionBar = _ActionBar as ActionBarComponent;
ActionBar.Button = ActionButton;

export { ActionBar };
export type { ActionButtonProps };
