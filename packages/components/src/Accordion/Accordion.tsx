import React, { useRef, ReactNode } from 'react';
import { useAccordion } from '@react-aria/accordion';
import { useTreeState } from '@react-stately/tree';
import { AccordionItem } from './AccordionItem';
import { CollectionElement } from '@react-types/shared';
import { Item } from '@react-stately/collections';
import { ThemeExtensionsWithParts, useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface AccordionThemeExtension
  extends ThemeExtensionsWithParts<'Accordion', ['button', 'icon', 'item']> {}
export interface AccordionProps {
  children: CollectionElement<object> | CollectionElement<object>[];
  variant: string;
  size: string;
}

export const Accordion = ({ variant, size, ...props }: AccordionProps) => {
  const ownProps = { ...props };
  const ref = useRef(null);
  const state = useTreeState({
    ...ownProps,
  });
  const { accordionProps } = useAccordion(props, state, ref);

  const styles = useComponentStyles(
    'Accordion',
    { variant, size },
    { parts: ['icon', 'item', 'button'] }
  );

  return (
    <div {...accordionProps} ref={ref}>
      {[...state.collection].map(item => (
        <AccordionItem
          key={item.key}
          title={item.props.title}
          item={item}
          state={state}
          css={styles}
        />
      ))}
    </div>
  );
};

Accordion.Item = Item;
