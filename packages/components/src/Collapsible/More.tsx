import type { ReactNode } from 'react';
import { Children, useState } from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { intlMessages } from '../intl/messages';
import type { CollapsibleProps } from './Collapsible';
import { Collapsible } from './Collapsible';

export interface MoreProps extends Pick<
  CollapsibleProps,
  'unstyled' | 'defaultExpanded'
> {
  /**
   * The children of the component
   */
  children?: ReactNode;

  /**
   * Show the count of items in the collapsed and expanded state
   */
  showCount?: boolean;
}

export const More = ({
  children,
  defaultExpanded = false,
  unstyled = true,
  showCount = false,
  ...props
}: MoreProps) => {
  /**
   * We need to add state here, because toggling on a checkbox will
   * force a rerender and without the state the <Collapsible> will be collapsed.
   */
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');
  const count = `${Children.count(children)}`;

  return (
    <Collapsible
      variant="link"
      unstyled={unstyled}
      isExpanded={isExpanded}
      {...props}
    >
      <Collapsible.Content>{children}</Collapsible.Content>
      <Collapsible.Trigger onPress={() => setIsExpanded(!isExpanded)}>
        {isExpanded
          ? stringFormatter.format(showCount ? 'showLessCount' : 'showLess', {
              count,
            })
          : stringFormatter.format(showCount ? 'showMoreCount' : 'showMore', {
              count,
            })}
      </Collapsible.Trigger>
    </Collapsible>
  );
};
