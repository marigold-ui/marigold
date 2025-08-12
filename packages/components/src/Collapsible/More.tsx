import type { ReactNode } from 'react';
import { useState } from 'react';
import { Collapsible } from './Collapsible';

export interface MoreProps {
  /**
   * The children of the component
   */
  children?: ReactNode;
}

export const More = ({ children }: MoreProps) => {
  /**
   * We need to add state here, because toggling on a checkbox will
   * force a rerender and without the state the <Collapsible> will be collapsed.
   */
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible isExpanded={isExpanded}>
      <Collapsible.Content>{children}</Collapsible.Content>
      <Collapsible.Trigger
        variant="link"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        show more
      </Collapsible.Trigger>
    </Collapsible>
  );
};
