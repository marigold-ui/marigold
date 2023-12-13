import { ReactNode } from 'react';
import { Section } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Header } from '../Header';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';
export interface MenuSectionProps
  extends Omit<RAC.SectionProps<object>, RemovedProps> {
  title?: string;
  children: ReactNode;
}

// Component
// ---------------
const _MenuSection = ({ children, title, ...props }: MenuSectionProps) => {
  const className = useClassNames({ component: 'Menu' });
  return (
    <Section {...props}>
      <Header className={className.section}>{title}</Header>
      {children}
    </Section>
  );
};

export { _MenuSection as MenuSection };
