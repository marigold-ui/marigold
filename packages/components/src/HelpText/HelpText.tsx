import type { ReactNode } from 'react';
import { useContext } from 'react';
import type { ValidationResult } from 'react-aria-components';
import { FieldError, FieldErrorContext, Text } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { TriangleAlert } from '../icons/TriangleAlert';

// Props
// ---------------
export interface HelpTextProps {
  variant?: string;
  size?: string;
  /**
   * A helpful text.
   */
  description?: ReactNode;
  /**
   * An error message.
   */
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
  const ctx = useContext(FieldErrorContext);

  // Prevent rendering anything if no error/description should be shown.
  if (!description && !ctx?.isInvalid) {
    return null;
  }

  return (
    <div className={cn('in-field:mt-1', classNames.container)}>
      <FieldError {...props} className="flex flex-col">
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
            messages.map((msg, idx) => (
              <div key={idx} className="flex items-center justify-start gap-1">
                <TriangleAlert
                  className={cn('h-4 w-4 shrink-0', classNames.icon)}
                />
                {msg}
              </div>
            ))
          ) : (
            <div className="flex items-start justify-start gap-1">
              <TriangleAlert
                className={cn('h-4 w-4 shrink-0', classNames.icon)}
              />
              {messages}
            </div>
          );
        }}
      </FieldError>
      {ctx && ctx.isInvalid ? null : (
        <Text slot="description">{description}</Text>
      )}
    </div>
  );
};
