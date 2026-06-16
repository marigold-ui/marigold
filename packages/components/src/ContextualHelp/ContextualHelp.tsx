import type { ComponentProps, ReactNode, Ref } from 'react';
import { useMemo } from 'react';
import { Button } from 'react-aria-components/Button';
import {
  Dialog,
  DialogTrigger as RACDialogTrigger,
} from 'react-aria-components/Dialog';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { ButtonContext, RESET_BUTTON_CONTEXT } from '../Button/Context';
import { Popover } from '../Overlay/Popover';
import { CircleQuestionMark } from '../icons/CircleQuestionMark';
import { Info } from '../icons/Info';
import { intlMessages } from '../intl/messages';
import { ContextualHelpContent } from './ContextualHelpContent';
import { ContextualHelpDescription } from './ContextualHelpDescription';
import { ContextualHelpTitle } from './ContextualHelpTitle';

const icons = {
  help: CircleQuestionMark,
  info: Info,
};

type RemovedProps = 'isOpen';
interface DialogTriggerProps extends Omit<
  ComponentProps<typeof RACDialogTrigger>,
  RemovedProps
> {
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
  size?: string;

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

const ContextualHelpBase = ({
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
  ref,
}: ContextualHelpProps & { ref?: Ref<HTMLButtonElement> }) => {
  const Icon = icons[variant];
  const classNames = useClassNames({
    component: 'ContextualHelp',
    variant,
    size,
  });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  // Configure the `description` slot for the `<Description>` primitive
  // (wrapped by `<ContextualHelp.Description>`). The title slot is NOT
  // configured here on purpose: the RAC `<Dialog>` already publishes a
  // `HeadingContext` that wires `aria-labelledby` to `<Heading slot="title">`;
  // re-providing it would clobber that wiring.
  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: cn('[grid-area:description]', classNames.description),
          elementType: 'p' as const,
        },
      },
    }),
    [classNames.description]
  );

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
            "grid [grid-template-areas:'title'_'description'_'content']",
            classNames.container
          )}
          {...{
            [`data-${width ?? 'medium'}`]: true,
          }}
        >
          <Provider
            values={[
              [TextContext, textProps],
              // Scope action buttons in the help content to a clean baseline,
              // consistent with the `Popover`'s own `ResetButtonContext`.
              [ButtonContext, RESET_BUTTON_CONTEXT],
            ]}
          >
            {children}
          </Provider>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export const ContextualHelp = Object.assign(ContextualHelpBase, {
  Title: ContextualHelpTitle,
  Description: ContextualHelpDescription,
  Content: ContextualHelpContent,
});
