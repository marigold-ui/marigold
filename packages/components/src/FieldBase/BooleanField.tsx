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
}

// Component
// ---------------
export const BooleanField = ({
  description,
  context,
  children,
}: PropsWithChildren<BooleanFieldProps>) => {
  const classNames = useClassNames({ component: 'BooleanField' });
  const descriptionId = useId();

  if (!description) return children;

  return (
    <div
      className={cn('group/booleanfield', classNames.container)}
      data-booleanfield
    >
      <Provider
        values={[
          [context, { 'aria-describedby': descriptionId }],
          [TextContext, { id: descriptionId }],
        ]}
      >
        {children}
        <div className={classNames.description}>
          <HelpText description={description} />
        </div>
      </Provider>
    </div>
  );
};
