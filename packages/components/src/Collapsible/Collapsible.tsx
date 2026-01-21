import type { DisclosureProps } from 'react-aria-components';
import { Disclosure } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleTrigger } from './CollapsibleTrigger';
import { CollapsibleProvider } from './Context';

export interface CollapsibleProps extends Omit<
  DisclosureProps,
  'className' | 'style'
> {
  variant?: 'default' | 'link' | (string & {});
  size?: 'default' | (string & {});

  /**
   * Removes the form's visual container so that it does not impact the layout,
   * letting child elements render naturally.
   */
  unstyled?: boolean;
}

export const Collapsible = ({
  variant,
  size,
  children,
  unstyled,
  ...props
}: CollapsibleProps) => {
  const classNames = useClassNames({ component: 'Collapsible', variant, size });

  return (
    <CollapsibleProvider value={{ variant, size }}>
      <Disclosure
        {...props}
        className={cn(
          classNames.container,
          unstyled && 'expanded:contents expanded:[&_[role=group]]:contents'
        )}
      >
        {children}
      </Disclosure>
    </CollapsibleProvider>
  );
};

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
