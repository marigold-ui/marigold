import React, { ReactNode, useRef } from 'react';
import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';
import { TreeProps, useTreeState } from '@react-stately/tree';
import { AccordionItem, AccordionItemProps } from './AccordionItem';
import { Item } from '@react-stately/collections';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { CollectionChildren, CollectionElement } from '@react-types/shared';
import { filterDOMProps } from '@react-aria/utils';

// Theme Extension
// ---------------
// export interface AccordionThemeExtension
//   extends ThemeExtensionsWithParts<'Accordion', ['button', 'icon', 'item']> {}

export interface AccordionProps
  extends Omit<AriaAccordionProps<object>, 'items' | 'children'> {
  children:
    | CollectionElement<object>
    | ((item: object) => CollectionElement<object>)
    | CollectionElement<object>[];
  variant?: string;
  size?: string;
}

export const Accordion = ({ variant, size, ...props }: AccordionProps) => {
  const ownProps = { ...props };
  const ref = useRef(null);
  const state = useTreeState({
    ...ownProps,
  });
  const { accordionProps } = useAccordion(ownProps, state, ref);

  // const styles = useComponentStyles(
  //   'Accordion',
  //   { variant, size },
  //   { parts: ['item', 'button'] }
  // );

  //console.log([state.collection].values());

  [state.collection].map(a => console.log(a));
  return (
    <Box {...filterDOMProps(accordionProps)} {...ownProps} ref={ref}>
      {[...state.collection].map(item => (
        <AccordionItem
          key={item.key}
          title={item.props.title}
          item={item}
          state={state}
          stretch={item.props.stretch}
        />
      ))}
    </Box>
  );
};

Accordion.Item = Item;
