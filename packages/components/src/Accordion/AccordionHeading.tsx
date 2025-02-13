import { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { Button } from '../Button';
import { ChevronRight } from '../icons/ChevronRight';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  children?: ReactNode;
}

export const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  const { classNames } = useAccordionContext();
  return (
    <Heading>
      <Button slot="trigger" className={cn('group', classNames.header)}>
        {children}
        <ChevronRight
          className={cn(classNames.icon, 'group-aria-expanded:rotate-90')}
        />
      </Button>
    </Heading>
  );
};
