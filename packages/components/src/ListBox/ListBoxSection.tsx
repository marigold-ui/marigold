import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Header, ListBoxSection } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useListBoxContext } from './Context';

export interface SectionProps extends Omit<
  RAC.SectionProps<object>,
  'className' | 'style' | 'children'
> {
  /**
   * Section header to display.
   */
  header: ReactNode;
  /**
   * Children of the section.
   */
  children: ReactNode;
}

const SectionComp = ({ header, children, ...props }: SectionProps) => {
  const { classNames } = useListBoxContext();
  return (
    <ListBoxSection
      {...props}
      className={cn(classNames.section, classNames.header)}
    >
      <Header>{header}</Header>
      {children}
    </ListBoxSection>
  );
};

export { SectionComp as Section };
