import { Section } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

import { Header } from '../Header';
import { MenuItem } from './MenuItem';

// Props
// ---------------
type RemovedProps = 'className' | 'style';
export interface MenuSectionProps
  extends Omit<RAC.SectionProps<object>, RemovedProps> {
  title?: string;
}

// Component
// ---------------
const _MenuSection = ({ children, title, ...props }: MenuSectionProps) => {
  const className = useClassNames({ component: 'Menu' });
  return (
    <Section className={className.section} {...props}>
      <Header>{title}</Header>
      {children}
    </Section>
  );
};

export { _MenuSection as MenuSection };
