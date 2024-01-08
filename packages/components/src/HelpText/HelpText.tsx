import { type ReactNode } from 'react';
import type { ValidationResult } from 'react-aria-components';
import { FieldError, Text } from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

// Icon
// ---------------
const Icon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4 shrink-0', className)}
    viewBox="0 0 24 24"
    role="presentation"
    fill="currentColor"
  >
    <path d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z" />
  </svg>
);

// Props
// ---------------
export interface HelpTextProps {
  variant?: string;
  size?: string;
  description?: ReactNode;
  errorMessage?: ReactNode | ((v: ValidationResult) => ReactNode);
}

// Component
// ---------------
export const HelpText = ({
  variant,
  size,
  description,
  errorMessage,
  ...props
}: HelpTextProps) => {
  const classNames = useClassNames({
    component: 'HelpText',
    variant,
    size,
  });

  return (
    <div className={cn(classNames.container)}>
      <FieldError {...props} className="peer/error flex flex-col gap-1">
        {validation => {
          /**
           * Prefer custom error messages, fallback to native errors ones.
           *
           * Note that we can not merge custom and native error messages,
           * because we can not distinguish the type of error messages
           * in the native ones since it is just an array of strings.
           */
          const messages =
            (typeof errorMessage === 'function'
              ? errorMessage(validation)
              : errorMessage) || validation.validationErrors;

          return Array.isArray(messages) ? (
            messages.map(msg => (
              <div className="flex items-center justify-start gap-1">
                <Icon className={classNames.icon} />
                {msg}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-start gap-1">
              <Icon className={classNames.icon} />
              {messages}
            </div>
          );
        }}
      </FieldError>
      <Text slot="description" className="peer-first/error:hidden">
        {description}
      </Text>
    </div>
  );
};
