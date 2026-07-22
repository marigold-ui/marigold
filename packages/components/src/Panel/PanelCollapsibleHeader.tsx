import type { ReactNode } from 'react';
import { use, useId, useMemo } from 'react';
import { Button } from 'react-aria-components/Button';
import { DisclosureStateContext } from 'react-aria-components/Disclosure';
import { Heading, HeadingContext } from 'react-aria-components/Heading';
import { TextContext, type TextProps } from 'react-aria-components/Text';
import { type ContextValue, Provider } from 'react-aria-components/slots';
import { cn } from '@marigold/system';
import { MorphCaret } from '../icons/MorphCaret';
import { noSlot } from '../utils/noSlot';
import { useSlot } from '../utils/useSlot';
import { usePanelContext } from './Context';

export interface PanelCollapsibleHeaderProps {
  /**
   * A `<Title>` and an optional `<Description>`. A `<Title>` is required:
   * the disclosure trigger references it via `aria-labelledby` to expose
   * the header's accessible name, so omitting it leaves the trigger
   * without a label.
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

  // The `as: 'span'` slot key is part of `HeadingProps` via the declaration
  // merge in `Title/Title.tsx`, so no local widening type is needed here.
  const headingProps = useMemo(
    () => ({
      slots: {
        title: {
          className: classNames.collapsibleTitle,
          id: titleId,
          as: 'span' as const,
        },
      },
    }),
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
    // shortcut); `slot={noSlot}` opts this structural Heading out of it.
    <Heading level={level} slot={noSlot} className="flex">
      <Button
        slot="trigger"
        aria-labelledby={titleId}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={cn('flex-1', classNames.collapsibleHeader)}
      >
        <Provider
          values={[
            [HeadingContext, headingProps],
            [TextContext, textProps as ContextValue<TextProps, HTMLElement>],
          ]}
        >
          <span className="min-w-0 flex-1">{children}</span>
        </Provider>
        <MorphCaret
          size="16"
          expanded={isExpanded}
          className={classNames.collapsibleIcon}
        />
      </Button>
    </Heading>
  );
};
