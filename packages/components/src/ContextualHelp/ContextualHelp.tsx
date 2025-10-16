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
import { CircleQuestionMark } from '../icons/CircleQuestionMark';
import { Info } from '../icons/Info';
import { ContextualHelpContent } from './ContextualHelpContent';
import { ContextualHelpTitle } from './ContextualHelpTitle';

const icons = {
  help: () => <CircleQuestionMark size={20} />,
  info: () => <Info size={20} />,
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
      offset = 0,
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
          <Dialog className={classNames.container}>{children}</Dialog>
        </Popover>
      </DialogTrigger>
    );
  }
) as ContextualHelpComponent;

_ContextualHelp.Title = ContextualHelpTitle;
_ContextualHelp.Content = ContextualHelpContent;

export { _ContextualHelp as ContextualHelp };
