import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { announce } from '@react-aria/live-announcer';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { CircleAlert } from '../icons/CircleAlert';
import { CircleCheck } from '../icons/CircleCheck';
import { Info } from '../icons/Info';
import { TriangleAlert } from '../icons/TriangleAlert';
import { intlMessages } from '../intl/messages';
import { SectionMessageContext } from './Context';
import { SectionMessageContent } from './SectionMessageContent';
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
   * Announce the message to assistive technology when it mounts.
   * Priority is `assertive` for `variant="error"` and `polite` for all other
   * variants. Set this for messages that appear dynamically in response to a
   * user action. To re-announce the same message, remount the component with
   * a changing `key`.
   * @default true for `variant="error"`, false otherwise.
   */
  announce?: boolean;
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

  const [internalVisible, setInternalVisible] = useState(true);
  const isCurrentlyVisible = close ?? internalVisible;

  // Announce on mount. Remount with a changing `key` to re-announce.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const shouldAnnounce = announceProp ?? variant === 'error';
    if (!shouldAnnounce || !isCurrentlyVisible) return;
    const text = containerRef.current?.textContent?.trim();
    if (text) announce(text, variant === 'error' ? 'assertive' : 'polite');
  }, []);

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
      <div
        {...props}
        ref={containerRef}
        className={cn('grid auto-rows-min', classNames.container)}
      >
        <div className={cn('[grid-area:icon]', classNames.icon)}>
          {Icon && <Icon size="20" />}
        </div>
        {closeButton && (
          <CloseButton
            aria-label={stringFormatter.format('close')}
            className="[grid-area:close]"
            onPress={handleClose}
          />
        )}
        {children}
      </div>
    </SectionMessageContext>
  );
};

SectionMessage.Title = SectionMessageTitle;
SectionMessage.Content = SectionMessageContent;
