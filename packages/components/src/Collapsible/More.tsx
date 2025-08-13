import type { ReactNode } from 'react';
import { useState } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import { Collapsible } from './Collapsible';

export interface MoreProps {
  /**
   * The children of the component
   */
  children?: ReactNode;
}

export const More = ({ children }: MoreProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  /**
   * We need to add state here, because toggling on a checkbox will
   * force a rerender and without the state the <Collapsible> will be collapsed.
   */
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible variant="link" isExpanded={isExpanded}>
      <Collapsible.Content>{children}</Collapsible.Content>
      <Collapsible.Trigger onPress={() => setIsExpanded(!isExpanded)}>
        {isExpanded
          ? stringFormatter.format('showLess')
          : stringFormatter.format('showMore')}
      </Collapsible.Trigger>
    </Collapsible>
  );
};
