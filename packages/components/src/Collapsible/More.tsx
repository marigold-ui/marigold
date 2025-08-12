import { ReactNode, useState } from 'react';
import { Button, Disclosure, DisclosurePanel } from 'react-aria-components';

export interface MoreProps {
  /**
   * The children of the component
   */
  children?: ReactNode;
}

export const More = ({ children }: MoreProps) => {
  /**
   * We need to add state here, because toggling on a checkbox will
   * force a rerender and without the state the <Disclosure> will be collapsed.
   */
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Disclosure isExpanded={isExpanded}>
      <DisclosurePanel>{children}</DisclosurePanel>
      <Button slot="trigger" onPress={() => setIsExpanded(!isExpanded)}>
        show more
      </Button>
    </Disclosure>
  );
};
