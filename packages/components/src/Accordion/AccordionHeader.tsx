import { ReactNode, use } from 'react';
import { Button } from 'react-aria-components/Button';
import { DisclosureStateContext } from 'react-aria-components/Disclosure';
import { Heading } from 'react-aria-components/Heading';
import { MorphCaret } from '../icons/MorphCaret';
import { noSlot } from '../utils/noSlot';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  children?: ReactNode;
  /**
   * Content rendered next to the title, inside the same header row (e.g. action
   * buttons). Use this instead of wrapping `Accordion.Header` in a layout
   * component, otherwise `stickyHeader` cannot keep the header pinned.
   */
  actions?: ReactNode;
}

export const AccordionHeader = ({
  children,
  actions,
}: AccordionHeaderProps) => {
  const { classNames, stickyHeader, iconPosition } = useAccordionContext();
  const { isExpanded } = use(DisclosureStateContext)!;

  const heading = (
    <Heading slot={noSlot} className={actions ? 'min-w-0 flex-1' : undefined}>
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
  );

  return (
    <div
      className={stickyHeader ? 'bg-surface/90 sticky top-0 z-1' : undefined}
    >
      {actions ? (
        <div className="flex items-center">
          {heading}
          <div className="shrink-0">{actions}</div>
        </div>
      ) : (
        heading
      )}
    </div>
  );
};
