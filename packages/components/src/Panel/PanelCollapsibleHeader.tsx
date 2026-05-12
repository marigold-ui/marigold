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
  /** Typically a `<Title>` and an optional `<Description>`. */
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
    // Panel root publishes a slot-keyed HeadingContext (for the title-only
    // shortcut); `slot={null}` opts this structural Heading out of it.
    <Heading
      level={level}
      slot={null as unknown as string | undefined}
      className="flex"
    >
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
  );
};
