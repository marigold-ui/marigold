import React, { HTMLAttributes, ReactNode } from 'react';
import { SVG, cn, useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface HelpTextProps extends Omit<HtmlProps<'div'>, 'className'> {
  variant?: string;
  size?: string;
  className?: {
    container?: string;
    icon?: string;
  };
  disabled?: boolean;
  description?: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLElement>;
  error?: boolean;
  errorMessage?: ReactNode;
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}

// Component
// ---------------
export const HelpText = ({
  variant,
  size,
  className,
  disabled,
  description,
  descriptionProps,
  error,
  errorMessage,
  errorMessageProps,
  ...props
}: HelpTextProps) => {
  const hasErrorMessage = errorMessage && error;
  const classNames = useClassNames({
    component: 'HelpText',
    variant,
    size,
    className,
  });

  return (
    <div
      {...props}
      {...(hasErrorMessage ? errorMessageProps : descriptionProps)}
      className={cn('flex items-center gap-1', classNames.container)}
    >
      {hasErrorMessage ? (
        <>
          <SVG
            className={cn('h-4 w-4', classNames.icon)}
            viewBox="0 0 24 24"
            role="presentation"
          >
            <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z" />
          </SVG>

          {errorMessage}
        </>
      ) : (
        <>{description}</>
      )}
    </div>
  );
};
