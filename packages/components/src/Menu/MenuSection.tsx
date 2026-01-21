import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Header, MenuSection } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';
export interface MenuSectionProps extends Omit<
  RAC.SectionProps<object>,
  RemovedProps
> {
  title?: string;
  children: ReactNode;
}

// Component
// ---------------
const _MenuSection = ({ children, title, ...props }: MenuSectionProps) => {
  const className = useClassNames({ component: 'Menu' });
  return (
    <MenuSection {...props}>
      <Header className={className.section}>{title}</Header>
      {children}
    </MenuSection>
  );
};

export { _MenuSection as MenuSection };
