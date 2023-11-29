import { Section } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn } from '@marigold/system';

import { useListBoxContext } from './Context';

export interface SectionProps
  extends Omit<RAC.SectionProps<object>, 'className' | 'style'> {}

const _Section = (props: SectionProps) => {
  const { classNames } = useListBoxContext();
  return (
    <Section
      {...props}
      className={cn(classNames.section, classNames.sectionTitle)}
    />
  );
};

export { _Section as Section };
