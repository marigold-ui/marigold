import { ReactNode, use } from 'react';
import { Button } from 'react-aria-components/Button';
import { DisclosureStateContext } from 'react-aria-components/Disclosure';
import { Heading } from 'react-aria-components/Heading';
import { MorphCaret } from '../icons/MorphCaret';
import { noSlot } from '../utils/noSlot';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  children?: ReactNode;
}

export const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  const { classNames, stickyHeader, iconPosition } = useAccordionContext();
  const { isExpanded } = use(DisclosureStateContext)!;

  return (
    <div
      className={
        stickyHeader
          ? 'bg-background/90 sticky top-0 z-1 backdrop-blur-xs'
          : undefined
      }
    >
      <Heading slot={noSlot}>
        <Button slot="trigger" className={classNames.header}>
          {iconPosition === 'left' && (
            <MorphCaret
              size="16"
              expanded={isExpanded}
              className={classNames.icon}
            />
          )}
          <div className="flex-1 items-center">{children}</div>
          {iconPosition === 'right' && (
            <MorphCaret
              size="16"
              expanded={isExpanded}
              className={classNames.icon}
            />
          )}
        </Button>
      </Heading>
    </div>
  );
};
