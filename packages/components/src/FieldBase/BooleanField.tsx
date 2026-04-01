import type { PropsWithChildren, ReactNode } from 'react';
import type { ContextValue } from 'react-aria-components';
import { Provider, TextContext } from 'react-aria-components';
import { useId } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { HelpText } from '../HelpText/HelpText';

// Props
// ---------------
export interface BooleanFieldProps {
  /**
   * A helpful text.
   */
  description?: ReactNode;

  /**
   * The RAC context to inject `aria-describedby` into.
   */
  context: React.Context<
    ContextValue<{ 'aria-describedby'?: string }, HTMLElement>
  >;

  /**
   * Class name applied to the description wrapper to align it with the label text.
   */
  descriptionClassName?: string;
}

// Component
// ---------------
export const BooleanField = ({
  description,
  context,
  descriptionClassName,
  children,
}: PropsWithChildren<BooleanFieldProps>) => {
  const className = useClassNames({
    component: 'Field',
  });
  const descriptionId = useId();

  if (!description) return children;

  return (
    <div className={className}>
      <Provider
        values={[
          [context, { 'aria-describedby': descriptionId }],
          [TextContext, { id: descriptionId }],
        ]}
      >
        {children}
        <div className={cn('mt-0.5', descriptionClassName)}>
          <HelpText description={description} />
        </div>
      </Provider>
    </div>
  );
};
