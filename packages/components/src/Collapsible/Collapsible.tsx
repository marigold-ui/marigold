import type { DisclosureProps } from 'react-aria-components';
import { Disclosure } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleTrigger } from './CollapsibleTrigger';
import { CollapsibleProvider } from './Context';

export interface CollapsibleProps
  extends Omit<DisclosureProps, 'className' | 'style'> {
  variant?: string;
  size?: string;
}

export const Collapsible = ({
  variant,
  size,
  children,
  ...props
}: CollapsibleProps) => {
  const classNames = useClassNames({ component: 'Collapsible', variant, size });
  return (
    <CollapsibleProvider value={{ variant, size }}>
      <Disclosure {...props} className={classNames.trigger}>
        {children}
      </Disclosure>
    </CollapsibleProvider>
  );
};

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
