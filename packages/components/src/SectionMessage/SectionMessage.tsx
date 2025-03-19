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
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </svg>
  ),
  info: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </svg>
  ),
  warning: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z" />
    </svg>
  ),
  error: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm-40-361h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Z" />
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
          <div className="h-6 w-6 text-center">
            <button
              {...buttonProps}
              ref={buttonRef}
              aria-label="close"
              className={cn('[grid-area:close]', classNames.close)}
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
          </div>
        )}
        {children}
      </div>
    </SectionMessageContext.Provider>
  );
};

SectionMessage.Title = SectionMessageTitle;
SectionMessage.Content = SectionMessageContent;
