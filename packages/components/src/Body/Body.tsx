import { ReactNode } from 'react';

import { useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface BodyProps extends Omit<HtmlProps<'section'>, 'className'> {
  /**
   * Children of the component
   */
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Body = ({ children, variant, size, ...props }: BodyProps) => {
  const classNames = useClassNames({ component: 'Body', variant, size });
  return (
    <section {...props} className={classNames}>
      {children}
    </section>
  );
};
