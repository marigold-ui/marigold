import { type ReactNode, useRef, useState } from 'react';
import { useButton } from '@react-aria/button';
import { cn, useClassNames } from '@marigold/system';
import { SectionMessageContext } from './Context';
import { SectionMessageContent } from './SectionMessageContent';
import { SectionMessageTitle } from './SectionMessageTitle';

// Icons
// ---------------
const icons = {
  success: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
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
  onClose?: () => void;
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
  onClose,
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

  const { buttonProps } = useButton({ ...props }, buttonRef);

  const handleClose = () => {
    onClose?.();
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
        <div
          className={cn(
            'h-5 w-5 self-center [grid-area:icon]',
            classNames.icon
          )}
        >
          {Icon && <Icon />}
        </div>
        {closeButton && (
          <button
            {...buttonProps}
            ref={buttonRef}
            aria-label="close"
            className="h-5 w-5 cursor-pointer border-none p-0 leading-normal outline-0 [grid-area:close]"
            onClick={handleClose}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </SectionMessageContext.Provider>
  );
};

SectionMessage.Title = SectionMessageTitle;
SectionMessage.Content = SectionMessageContent;
