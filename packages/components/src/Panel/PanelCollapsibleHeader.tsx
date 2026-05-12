import type { ReactNode } from 'react';
import { use, useId, useMemo } from 'react';
import {
  Button,
  DisclosureStateContext,
  Heading,
  HeadingContext,
  Provider,
  TextContext,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { MorphCaret } from '../icons/MorphCaret';
import { useSlot } from '../utils/useSlot';
import { usePanelContext } from './Context';

export interface PanelCollapsibleHeaderProps {
  /**
   * Content of the collapsible header. Typically a `<Title>` and an optional
   * `<Description>`. The whole header is rendered inside the disclosure
   * trigger button, so `<Title>` is configured to render as a `<span>`
   * (the outer heading semantics come from `Panel.CollapsibleHeader` itself).
   */
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

  const headingProps = useMemo(
    () =>
      ({
        slots: {
          title: {
            className: classNames.collapsibleTitle,
            id: titleId,
            as: 'span',
          },
        },
      }) as never,
    [classNames.collapsibleTitle, titleId]
  );

  const textProps = useMemo(
    () => ({
      slots: {
        description: {
          className: classNames.collapsibleDescription,
          id: descriptionId,
          ref: descriptionSlotRef,
          elementType: 'span' as const,
        },
      },
    }),
    [classNames.collapsibleDescription, descriptionId, descriptionSlotRef]
  );

  const { isExpanded } = disclosureState;
  const level = hasTitle
    ? (Math.min(headingLevel + 1, 6) as 2 | 3 | 4 | 5 | 6)
    : headingLevel;

  return (
    // Scope out the panel root's slot-keyed HeadingContext so the structural
    // <Heading> below renders cleanly. The inner Provider re-publishes
    // slot-keyed contexts for <Title> and <Description> living inside the button.
    <Provider values={[[HeadingContext, null]]}>
      <Heading level={level} className="flex">
        <Button
          slot="trigger"
          aria-labelledby={titleId}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn('flex-1', classNames.collapsibleHeader)}
        >
          <Provider
            values={[
              [HeadingContext, headingProps],
              [TextContext, textProps],
            ]}
          >
            <span className="min-w-0 flex-1">{children}</span>
          </Provider>
          <MorphCaret expanded={isExpanded} />
        </Button>
      </Heading>
    </Provider>
  );
};
