import { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { Button } from '../Button';
import { ChevronRight } from '../icons/ChevronRight';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  title?: ReactNode;
}

export const AccordionHeader = ({ title }: AccordionHeaderProps) => {
  const { classNames } = useAccordionContext();
  return (
    <Heading>
      <Button slot="trigger" className={cn('group', classNames.header)}>
        {title}
        <ChevronRight
          className={cn(classNames.icon, 'group-aria-expanded:rotate-90')}
        />
      </Button>
    </Heading>
  );
};
