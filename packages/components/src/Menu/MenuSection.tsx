import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Header } from 'react-aria-components/Header';
import { MenuSection as RACMenuSection } from 'react-aria-components/Menu';
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
const MenuSection = ({ children, title, ...props }: MenuSectionProps) => {
  const className = useClassNames({ component: 'Menu' });
  return (
    <RACMenuSection {...props}>
      <Header className={className.section}>{title}</Header>
      {children}
    </RACMenuSection>
  );
};

export { MenuSection };
