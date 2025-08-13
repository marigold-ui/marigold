import type { ReactNode } from 'react';
import { useState } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import type { CollapsibleProps } from './Collapsible';
import { Collapsible } from './Collapsible';

export interface MoreProps extends Pick<CollapsibleProps, 'unstyled'> {
  /**
   * The children of the component
   */
  children?: ReactNode;
}

export const More = ({ children, unstyled = true }: MoreProps) => {
  /**
   * We need to add state here, because toggling on a checkbox will
   * force a rerender and without the state the <Collapsible> will be collapsed.
   */
  const [isExpanded, setIsExpanded] = useState(false);
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  return (
    <Collapsible variant="link" unstyled={unstyled} isExpanded={isExpanded}>
      <Collapsible.Content>{children}</Collapsible.Content>
      <Collapsible.Trigger onPress={() => setIsExpanded(!isExpanded)}>
        {isExpanded
          ? stringFormatter.format('showLess')
          : stringFormatter.format('showMore')}
      </Collapsible.Trigger>
    </Collapsible>
  );
};
