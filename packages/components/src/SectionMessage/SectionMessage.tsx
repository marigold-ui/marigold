import {
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { HeadingContext } from 'react-aria-components/Heading';
import { TextContext } from 'react-aria-components/Text';
import { Provider } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { announce } from '@react-aria/live-announcer';
import { cn, useClassNames } from '@marigold/system';
import { ButtonContext, RESET_BUTTON_CONTEXT } from '../Button/Context';
import { CloseButton } from '../CloseButton/CloseButton';
import { CircleAlert } from '../icons/CircleAlert';
import { CircleCheck } from '../icons/CircleCheck';
import { Info } from '../icons/Info';
import { TriangleAlert } from '../icons/TriangleAlert';
import { intlMessages } from '../intl/messages';
import { useSlot } from '../utils/useSlot';
import { SectionMessageContext } from './Context';
import { SectionMessageContent } from './SectionMessageContent';
import { SectionMessageDescription } from './SectionMessageDescription';
import { SectionMessageTitle } from './SectionMessageTitle';

// Icons
// ---------------
const icons = {
  success: CircleCheck,
  info: Info,
  warning: CircleAlert,
  error: TriangleAlert,
} as const;

// Props
// ---------------
export interface SectionMessageProps {
  variant?: keyof typeof icons;
  size?: string;
  /**
   * The children of the component.
   */
  children?: ReactNode;
  /**
   * Adds a close button, makes the section message dismissable.
   */
  closeButton?: boolean;
  /**
   * Handler that is called when you need to control the dismissable message to close.
   */
  onCloseChange?: (close: boolean) => void;
  /**
   * If the message should be closed/dismissed (controlled).
   */
  close?: boolean;
  /**
   * Announce the message to assistive technology when it appears.
   * Fires on mount and whenever controlled visibility (`close`) transitions
   * from hidden to visible. Priority is `assertive` for `variant="error"` and
   * `polite` for all other variants. To re-announce the same message without a
   * visibility change, remount the component with a changing `key`.
   * @default true for `variant="error"`, false otherwise.
   */
  announce?: boolean;
  /**
   * Heading level of the `<SectionMessage.Title>` (h2–h6). Adjust it so the
   * title fits into the surrounding document outline.
   * @default 3
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

// Component
// ---------------
export const SectionMessage = ({
  variant = 'info',
  size,
  children,
  closeButton,
  close,
  onCloseChange,
  announce: announceProp,
  headingLevel = 3,
  ...props
}: SectionMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'SectionMessage',
    variant,
    size,
  });
  const Icon = icons[variant];

  const titleId = useId();
  const [titleSlotRef, hasTitle] = useSlot(false);

  // Slot configuration for the title (`<SectionMessage.Title>`, a semantic
  // heading) and an optional description (`<SectionMessage.Description>`).
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: cn('[grid-area:title]', classNames.title),
          level: headingLevel,
          id: titleId,
          ref: titleSlotRef,
        },
      },
    }),
    [classNames.title, headingLevel, titleId, titleSlotRef]
  );

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

  const [internalVisible, setInternalVisible] = useState(true);
  const isCurrentlyVisible = close ?? internalVisible;

  // Re-announce on each hidden -> visible transition. Same-content re-announce
  // without a visibility change still needs a `key` remount.
  useEffect(() => {
    if (!isCurrentlyVisible) return;
    const shouldAnnounce = announceProp ?? variant === 'error';
    if (!shouldAnnounce) return;
    const text = containerRef.current?.textContent?.trim();
    if (!text) return;
    const priority = variant === 'error' ? 'assertive' : 'polite';
    announce(text, priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentlyVisible]);

  const handleClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onCloseChange && close && onCloseChange(close);
    if (close === undefined) {
      setInternalVisible(false);
    }
  };

  if (!isCurrentlyVisible) return null;

  return (
    <SectionMessageContext value={{ classNames }}>
      <Provider
        values={[
          [HeadingContext, headingProps],
          [TextContext, textProps],
          // Scope action buttons placed in `.Content` to a clean baseline so
          // they never inherit a surrounding container's button cascade (e.g. a
          // `Panel.Header` ghost/small). No variant or positioning is imposed.
          [ButtonContext, RESET_BUTTON_CONTEXT],
        ]}
      >
        {/* `role="group"` permits naming via `aria-labelledby` (prohibited
            on a bare `<div>`) without adding a landmark per message. */}
        <div
          {...props}
          ref={containerRef}
          role={hasTitle ? 'group' : undefined}
          aria-labelledby={hasTitle ? titleId : undefined}
          className={cn('grid auto-rows-min', classNames.container)}
        >
          <div className={cn('[grid-area:icon]', classNames.icon)}>
            {Icon && <Icon size="20" />}
          </div>
          {closeButton && (
            <CloseButton
              aria-label={stringFormatter.format('close')}
              className="ui-touch-hitbox size-5 self-start [grid-area:close]"
              onPress={handleClose}
            />
          )}
          {children}
        </div>
      </Provider>
    </SectionMessageContext>
  );
};

SectionMessage.Title = SectionMessageTitle;
SectionMessage.Description = SectionMessageDescription;
SectionMessage.Content = SectionMessageContent;
