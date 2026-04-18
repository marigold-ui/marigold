import type { ReactNode } from 'react';
import { use, useId } from 'react';
import { Button, DisclosureStateContext, Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { MorphCaret } from '../icons/MorphCaret';
import { useSlot } from '../utils/useSlot';
import { CollapsibleHeaderProvider } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleHeaderProps {
  children: ReactNode;
}

export const PanelCollapsibleHeader = ({
  children,
}: PanelCollapsibleHeaderProps) => {
  const { classNames, headingLevel, hasTitle } = usePanelContext();
  const disclosureState = use(DisclosureStateContext);

  if (!disclosureState) {
    throw new Error(
      'Panel.CollapsibleHeader must be used within a <Panel.Collapsible> component.'
    );
  }

  const titleId = useId();
  const descriptionId = useId();
  const [descriptionSlotRef, hasDescription] = useSlot(false);

  const { isExpanded } = disclosureState;
  const level = hasTitle
    ? (Math.min(headingLevel + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6)
    : headingLevel;

  return (
    <CollapsibleHeaderProvider
      value={{ titleId, descriptionId, descriptionSlotRef }}
    >
      <Heading level={level} className="flex">
        <Button
          slot="trigger"
          aria-labelledby={titleId}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn('flex-1', classNames.collapsibleHeader)}
        >
          <span className="min-w-0 flex-1">{children}</span>
          <MorphCaret expanded={isExpanded} />
        </Button>
      </Heading>
    </CollapsibleHeaderProvider>
  );
};
