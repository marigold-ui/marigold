import React, { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface MessageProps extends HtmlProps<'div'> {
  messageTitle: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Message = ({
  messageTitle,
  variant = 'info',
  size,
  children,
  ...props
}: MessageProps) => {
  const classNames = useClassNames({ component: 'Message', variant, size });
  var icon = (
    <svg viewBox="0 0 24 24">
      <path d="M12 2.85938C6.95437 2.85938 2.85938 6.95437 2.85938 12C2.85938 17.0456 6.95437 21.1406 12 21.1406C17.0456 21.1406 21.1406 17.0456 21.1406 12C21.1406 6.95437 17.0456 2.85938 12 2.85938ZM12.7875 15.9374H11.2125V11.2124H12.7875V15.9374ZM12.7875 9.6375H11.2125V8.0625H12.7875V9.6375Z" />
    </svg>
  );
  if (variant === 'warning') {
    icon = (
      <svg viewBox="0 0 24 24">
        <path d="M19.2 3H4.8C3.81 3 3.009 3.81 3.009 4.8L3 21L6.6 17.4H19.2C20.19 17.4 21 16.59 21 15.6V4.8C21 3.81 20.19 3 19.2 3ZM12.9 13.8H11.1V12H12.9V13.8ZM12.9 10.2001H11.1V6.60008H12.9V10.2001Z" />
      </svg>
    );
  }
  if (variant === 'error') {
    icon = (
      <svg viewBox="0 0 24 24">
        <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z" />
      </svg>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[min-content_1fr] grid-rows-2',
        classNames.container
      )}
      {...props}
    >
      <div className={cn('hidden', classNames.icon)}>{icon}</div>
      <div className={classNames.title}>{messageTitle}</div>
      <div className={cn('col-span-full', classNames.content)}>{children}</div>
    </div>
  );
};
