import { ReactNode, useContext } from 'react';
import { Button, DisclosureStateContext, Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ChevronDown } from '../icons/ChevronDown';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  children?: ReactNode;
}

export const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  const { classNames } = useAccordionContext();
  /**
   * Use context to rotate the chevron.
   * "group-aria-expaned" is currently bugged with the RAC tailwind plugin.
   */
  const { isExpanded } = useContext(DisclosureStateContext)!;

  return (
    <Heading>
      <Button slot="trigger" className={classNames.header}>
        {children}
        <ChevronDown
          className={cn(classNames.icon, isExpanded && 'rotate-180')}
        />
      </Button>
    </Heading>
  );
};
