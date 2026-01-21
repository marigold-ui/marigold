import type { DisclosurePanelProps } from 'react-aria-components';
import { DisclosurePanel } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { CollapsibleContext } from './Context';

export interface CollapsibleContentProps extends Omit<
  DisclosurePanelProps,
  'className' | 'style'
> {
  variant?: string;
  size?: string;
}

export const CollapsibleContent = ({
  variant,
  size,
  children,
  ...props
}: CollapsibleContentProps) => {
  const classNames = useClassNames({
    component: 'Collapsible',
    variant,
    size,
    context: CollapsibleContext,
  });

  return (
    <DisclosurePanel {...props} className={classNames.content}>
      {children}
    </DisclosurePanel>
  );
};
