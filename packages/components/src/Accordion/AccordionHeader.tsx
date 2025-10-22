import { ReactNode, useContext } from 'react';
import { Button, DisclosureStateContext, Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ChevronDown } from '../icons/ChevronDown';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  children?: ReactNode;
}

export const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  const { classNames, stickyHeader, iconPosition } = useAccordionContext();
  /**
   * Use context to rotate the chevron.
   * "group-aria-expaned" is currently bugged with the RAC tailwind plugin.
   */
  const { isExpanded } = useContext(DisclosureStateContext)!;
  const chevronStyles = cn(classNames.icon, isExpanded && 'rotate-180');

  return (
    <div
      className={
        stickyHeader
          ? 'bg-background/90 sticky top-0 z-1 backdrop-blur-xs'
          : undefined
      }
    >
      <Heading>
        <Button slot="trigger" className={classNames.header}>
          {iconPosition === 'left' && (
            <ChevronDown size="16" className={chevronStyles} />
          )}
          <div className="flex-1 items-center">{children}</div>
          {iconPosition === 'right' && (
            <ChevronDown size="16" className={chevronStyles} />
          )}
        </Button>
      </Heading>
    </div>
  );
};
