import type { ReactNode } from 'react';
import { use } from 'react';
import { Button, DisclosureStateContext, Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { ChevronDown } from '../icons/ChevronDown';
import { usePanelContext } from './Context';

export interface PanelCollapsibleTriggerProps {
  children: ReactNode;
}

export const PanelCollapsibleTrigger = ({
  children,
}: PanelCollapsibleTriggerProps) => {
  const { classNames, headingLevel, hasTitle } = usePanelContext();
  const disclosureState = use(DisclosureStateContext);
  if (!disclosureState) {
    throw new Error(
      'Panel.CollapsibleTrigger must be used within a <Panel.Collapsible> component.'
    );
  }
  const { isExpanded } = disclosureState;

  const level = hasTitle
    ? (Math.min(headingLevel + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6)
    : headingLevel;

  return (
    <Heading level={level} className="flex">
      <Button slot="trigger" className={classNames.collapsibleTrigger}>
        <span className="flex-1">{children}</span>
        <ChevronDown
          className={cn(
            'shrink-0 transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </Button>
    </Heading>
  );
};
