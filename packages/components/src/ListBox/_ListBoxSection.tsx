import { Section } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn } from '@marigold/system';

import { useListBoxContext } from './Context';

export interface SectionProps extends RAC.SectionProps<object> {}

const _Section = (props: SectionProps) => {
  const { classNames } = useListBoxContext();
  return (
    <Section
      className={cn(classNames.section, classNames.sectionTitle)}
      {...props}
    />
  );
};

export { _Section as Section };
