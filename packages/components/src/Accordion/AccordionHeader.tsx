import { ReactNode, use } from 'react';
import { Button } from 'react-aria-components/Button';
import { DisclosureStateContext } from 'react-aria-components/Disclosure';
import { Heading } from 'react-aria-components/Heading';
import { Provider } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
import { ButtonContext } from '../Button/Context';
import { MorphCaret } from '../icons/MorphCaret';
import { noSlot } from '../utils/noSlot';
import { useAccordionContext } from './AccordionContext';

export interface AccordionHeaderProps {
  children?: ReactNode;
  /**
   * Content rendered next to the title, inside the same header row (e.g. action
   * buttons, a `<ButtonGroup>`, or an `<ActionMenu>`). Use this instead of
   * wrapping `Accordion.Header` in a layout component, otherwise `stickyHeader`
   * cannot keep the header pinned. Actions are slot-aware: a bare `<Button>`
   * adopts the header's ghost/small treatment (matching `Panel.Header`), so an
   * icon-only action sets `size="icon"` to render as a square.
   */
  actions?: ReactNode;
}

// Cascades a low-emphasis ghost look to every header action, matching
// `Panel.Header`. Icon-only actions opt into `size="icon"` themselves.
const headerActionContext = { variant: 'ghost', size: 'small' } as const;

export const AccordionHeader = ({
  children,
  actions,
}: AccordionHeaderProps) => {
  const { classNames, stickyHeader, iconPosition } = useAccordionContext();
  const { isExpanded } = use(DisclosureStateContext)!;

  const heading = (
    <Heading slot={noSlot} className="min-w-0 flex-1">
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
      className={cn(
        stickyHeader && 'bg-surface/90 sticky top-0 z-1',
        actions && 'flex items-center gap-2'
      )}
    >
      {actions ? (
        <>
          {heading}
          <div className={classNames.actions}>
            <Provider values={[[ButtonContext, headerActionContext]]}>
              {actions}
            </Provider>
          </div>
        </>
      ) : (
        heading
      )}
    </div>
  );
};
