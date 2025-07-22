import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
} from 'react';
import {
  Button,
  Dialog,
  Popover,
  DialogTrigger as RACDialogTrigger,
} from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { ContextualHelpContent } from './ContextualHelpContent';
import { ContextualHelpTitle } from './ContextualHelpTitle';

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

interface ContextualHelpComponent
  extends ForwardRefExoticComponent<
    ContextualHelpProps & RefAttributes<HTMLInputElement>
  > {
  /**
   * Options for the Combobox.
   */

  Title: typeof ContextualHelpTitle;

  Content: typeof ContextualHelpContent;
}

type RemovedProps = 'isOpen';
interface DialogTriggerProps
  extends Omit<React.ComponentProps<typeof RACDialogTrigger>, RemovedProps> {
  open?: boolean;
}

const DialogTrigger = ({ open, ...rest }: DialogTriggerProps) => (
  <RACDialogTrigger isOpen={open} {...rest} />
);
// Props
// ---------------

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
  /** Size of the button and popover. */
  size?: 'small' | 'medium' | 'large';

  /** Content rendered inside the popover. */
  children: ReactNode;

  /** Visual variant of the icon (e.g. info or help). */
  variant?: keyof typeof icons;

  /** Placement of the popover relative to the button. */
  placement?: Placement;

  /** Optional width size for the popover */
  width?: 'small' | 'medium' | 'large';

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
      size,
      width,
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
      variant,
      size,
    });

    return (
      <DialogTrigger
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Button
          ref={ref}
          className={classNames.trigger}
          aria-label={variant === 'info' ? 'Information' : 'Hilfe'}
        >
          {icon}
        </Button>

        <Popover
          placement={placement}
          offset={offset}
          className={classNames.popover}
          {...{
            [`data-${width ?? 'medium'}`]: true,
          }}
        >
          <Dialog className={(classNames.dialog, 'prose')}>{children}</Dialog>
        </Popover>
      </DialogTrigger>
    );
  }
) as ContextualHelpComponent;

_ContextualHelp.Title = ContextualHelpTitle;
_ContextualHelp.Content = ContextualHelpContent;

export { _ContextualHelp as ContextualHelp };
