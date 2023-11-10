import type { ReactNode } from 'react';
import { Text } from 'react-aria-components';
import type { ValidationResult } from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

export interface HelpTextProps {
  variant?: string;
  size?: string;
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
}

export const HelpText = ({
  variant,
  size,
  description,
  error,
  errorMessage,
  ...props
}: HelpTextProps) => {
  const hasErrorMessage = errorMessage && error;
  const classNames = useClassNames({
    component: 'HelpText',
    variant,
    size,
  });

  if (!description && !errorMessage) {
    return null;
  }

  return (
    <Text
      {...props}
      slot={hasErrorMessage ? 'errorMessage' : 'description'}
      className={cn('flex items-center gap-1', classNames.container)}
    >
      {hasErrorMessage ? (
        <>
          <svg
            className={cn('h-4 w-4', classNames.icon)}
            viewBox="0 0 24 24"
            role="presentation"
            fill="currentColor"
          >
            <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z" />
          </svg>
          {errorMessage}
        </>
      ) : (
        description
      )}
    </Text>
  );
};
