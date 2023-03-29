import React, { Children, useRef } from 'react';
import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';
import { useTreeState } from './useTreeState';
import { Item } from '@react-stately/collections';
import { Box } from '@marigold/system';
import { ItemElement, ItemProps } from '@react-types/shared';
import { AccordionItem } from './AccordionItem';

export interface AccordionProps
  extends Omit<AriaAccordionProps<object>, 'children'> {
  children: ItemElement<object>[] | ItemElement<object>;
  variant?: string;
  size?: string;
}

export const Accordion = ({
  variant,
  size,
  children,
  ...props
}: AccordionProps) => {
  const ownProps = {
    ...props,
    // we have to do this because JSX childs are not supported
    children: Children.toArray(children).map(child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        hasChildItems: false,
        ...child.props,
      });
    }),
  };
  const ref = useRef(null);
  const state = useTreeState({
    selectionMode: 'single',
    ...(ownProps as any),
  });

  console.log(state.expandedKeys);

  const { accordionProps } = useAccordion(ownProps, state, ref);

  return (
    <Box {...accordionProps} ref={ref} {...ownProps}>
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

export interface AccordionOwnItemProps<T> extends ItemProps<T> {
  stretch?: boolean;
}

Accordion.Item = Item as <T>(props: AccordionOwnItemProps<T>) => JSX.Element;
