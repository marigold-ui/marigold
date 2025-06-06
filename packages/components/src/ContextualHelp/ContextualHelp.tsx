import { ReactNode, forwardRef } from 'react';
import {
  Dialog,
  Popover,
  DialogTrigger as RACDialogTrigger,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { Button } from '../Button';

const icons = {
  help: () => (
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
  ),
  info: () => (
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
      className="lucide lucide-info-icon lucide-info h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
};

type RemovedProps = 'isOpen';
interface DialogTriggerProps
  extends Omit<React.ComponentProps<typeof RACDialogTrigger>, RemovedProps> {
  open?: boolean;
}

const DialogTrigger = forwardRef<HTMLDivElement, DialogTriggerProps>(
  ({ open, ...rest }, ref) => <RACDialogTrigger isOpen={open} {...rest} />
);
// Props
// ---------------

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
  variant?: keyof typeof icons;

  /** Size of the trigger button. */
  size?: Size;

  /** Placement of the popover relative to the button. */
  placement?: Placement;

  /** Offset (in px) between button and popover. */
  offset?: number;

  /** Whether the popover is open by default (uncontrolled). */
  defaultOpen?: boolean;

  /** Controls the open state of the popover (controlled). */
  open?: boolean;

  /** Handler that is called when the open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
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
      open,
      onOpenChange,
    },
    ref
  ) => {
    const icon = icons[variant]?.();
    const classNames = useClassNames({
      component: 'ContextualHelp',
      size,
      variant,
    });

    return (
      <DialogTrigger
        defaultOpen={defaultOpen}
        open={open}
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
