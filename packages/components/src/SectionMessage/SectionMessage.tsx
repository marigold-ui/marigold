import { ErrorFilled } from 'packages/components/src/icons/ErrorFilled';
import { InfoFilled } from 'packages/components/src/icons/InfoFilled';
import { SuccessFilled } from 'packages/components/src/icons/SuccessFilled';
import { WarningFilled } from 'packages/components/src/icons/WarningFilled';
import { type ReactNode, useRef, useState } from 'react';
import { useButton } from '@react-aria/button';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { SectionMessageContext } from './Context';
import { SectionMessageContent } from './SectionMessageContent';
import { SectionMessageTitle } from './SectionMessageTitle';

// Icons
// ---------------
const icons = {
  success: () => <SuccessFilled size={24} />,
  info: () => <InfoFilled size={24} />,
  warning: () => <WarningFilled size={24} />,
  error: () => <ErrorFilled size={24} />,
};

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
          {Icon && <Icon />}
        </div>
        {closeButton && (
          <CloseButton
            {...buttonProps}
            ref={buttonRef}
            aria-label="close"
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
