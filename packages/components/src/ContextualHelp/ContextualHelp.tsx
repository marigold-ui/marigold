import { ReactNode, forwardRef } from 'react';
import { Dialog, DialogTrigger, Popover } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Button } from '../Button';

// Props
// ---------------
/**
 * Variant of the contextual help icon.
 * @default help
 */
type Variant = 'help' | 'info';

/**
 * Size of the trigger button.
 * @default XS
 */
type Size = 'XS' | 'S';

/**
 * Placement of the popover.
 * @default bottom start
 */
type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top start'
  | 'bottom start';

/**
 * Props for the ContextualHelp component.
 */
export interface ContextualHelpProps {
  /** Content rendered inside the popover. */
  children: ReactNode;

  /** Visual variant of the icon (e.g. info or help). */
  variant?: Variant;

  /** Size of the trigger button. */
  size?: Size;

  /** Placement of the popover relative to the button. */
  placement?: Placement;

  /** Offset (in px) between button and popover. */
  offset?: number;

  /** Whether the popover is open by default (uncontrolled). */
  defaultOpen?: boolean;

  /** Controls the open state of the popover (controlled). */
  isOpen?: boolean;

  /** Handler that is called when the open state changes. */
  onOpenChange?: (isOpen: boolean) => void;

  /** Custom className applied to the trigger and popover. */
  className?: string;
}

export interface ContextualHelpProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top start'
    | 'bottom start';
  offset?: number;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

export const _ContextualHelp = forwardRef<
  HTMLButtonElement,
  ContextualHelpProps
>(
  (
    {
      children,
      variant = 'help',
      size = 'XS',
      placement = 'bottom start',
      offset = 8,
      defaultOpen,
      isOpen,
      onOpenChange,
    },
    ref
  ) => {
    const icon =
      variant === 'info' ? (
        <svg viewBox="0 0 24 24" className="h-5">
          <path d="M12 2.85938C6.95437 2.85938 2.85938 6.95437 2.85938 12C2.85938 17.0456 6.95437 21.1406 12 21.1406C17.0456 21.1406 21.1406 17.0456 21.1406 12C21.1406 6.95437 17.0456 2.85938 12 2.85938ZM12.7875 15.9374H11.2125V11.2124H12.7875V15.9374ZM12.7875 9.6375H11.2125V8.0625H12.7875V9.6375Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-help-icon lucide-circle-help h-5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      );
    const classNames = useClassNames({
      component: 'ContextualHelp',
      size,
      variant,
    });

    return (
      <DialogTrigger
        defaultOpen={defaultOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <Button
          ref={ref}
          size={size}
          className={classNames.trigger}
          aria-label={variant === 'info' ? 'Information' : 'Hilfe'}
        >
          {icon}
        </Button>

        <Popover
          placement={placement}
          offset={offset}
          className={classNames.popover}
        >
          <Dialog className={(classNames.dialog, 'prose')}>{children}</Dialog>
        </Popover>
      </DialogTrigger>
    );
  }
);

export { _ContextualHelp as ContextualHelp };
