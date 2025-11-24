import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
} from 'react';
import {
  Button,
  Dialog,
  DialogTrigger as RACDialogTrigger,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { Popover } from '../Overlay/Popover';
import { CircleQuestionMark } from '../icons/CircleQuestionMark';
import { Info } from '../icons/Info';
import { intlMessages } from '../intl/messages';
import { ContextualHelpContent } from './ContextualHelpContent';
import { ContextualHelpTitle } from './ContextualHelpTitle';

const icons = {
  help: CircleQuestionMark,
  info: Info,
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

  /** Accessible label for the button. */
  ariaLabel?: string;
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
      ariaLabel,
    },
    ref
  ) => {
    const Icon = icons[variant];
    const classNames = useClassNames({
      component: 'ContextualHelp',
      variant,
      size,
    });
    const stringFormatter = useLocalizedStringFormatter(intlMessages);

    return (
      <DialogTrigger
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Button
          ref={ref}
          className={classNames.trigger}
          aria-label={
            ariaLabel ??
            (variant === 'info'
              ? stringFormatter.format('moreInfo')
              : stringFormatter.format('help'))
          }
        >
          <Icon size={20} />
        </Button>

        <Popover placement={placement} offset={offset}>
          <Dialog
            className={cn(
              "grid [grid-template-areas:'title'_'content']",
              classNames.container
            )}
            {...{
              [`data-${width ?? 'medium'}`]: true,
            }}
          >
            {children}
          </Dialog>
        </Popover>
      </DialogTrigger>
    );
  }
) as ContextualHelpComponent;

_ContextualHelp.Title = ContextualHelpTitle;
_ContextualHelp.Content = ContextualHelpContent;

export { _ContextualHelp as ContextualHelp };
