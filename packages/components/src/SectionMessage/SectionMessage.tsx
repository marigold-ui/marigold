import { type ReactNode, useRef, useState } from 'react';
import { useButton } from '@react-aria/button';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
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
  ...props
}: SectionMessageProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const classNames = useClassNames({
    component: 'SectionMessage',
    variant,
    size,
  });
  const Icon = icons[variant];

  const [internalVisible, setInternalVisible] = useState(true);
  const isCurrentlyVisible = close ?? internalVisible;

  const { buttonProps } = useButton(props, buttonRef);

  const handleClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onCloseChange && close && onCloseChange(close);
    if (close === undefined) {
      setInternalVisible(false);
    }
  };

  if (!isCurrentlyVisible) return null;

  return (
    <SectionMessageContext.Provider value={{ classNames }}>
      <div
        role={variant === 'error' ? 'alert' : undefined}
        {...props}
        className={cn('grid auto-rows-min', classNames.container)}
      >
        <div className={cn('[grid-area:icon]', classNames.icon)}>
          {Icon && <Icon size="20" />}
        </div>
        {closeButton && (
          <CloseButton
            {...buttonProps}
            ref={buttonRef}
            aria-label={stringFormatter.format('close')}
            className={cn('[grid-area:close]', classNames.close)}
            onPress={handleClose}
          />
        )}
        {children}
      </div>
    </SectionMessageContext.Provider>
  );
};

SectionMessage.Title = SectionMessageTitle;
SectionMessage.Content = SectionMessageContent;
