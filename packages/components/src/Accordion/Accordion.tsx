import React, { Children, ReactNode, useRef } from 'react';
import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';
import { Item } from '@react-stately/collections';
import { Box } from '@marigold/system';
import { ItemElement, ItemProps } from '@react-types/shared';
import { AccordionItem } from './AccordionItem';
import { useTreeState } from '@react-stately/tree';

export interface AccordionProps
  extends Omit<AriaAccordionProps<object>, 'children'> {
  children: ItemElement<object>[] | ItemElement<object>;
}

export const Accordion = ({ children, ...props }: AccordionProps) => {
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

  const { accordionProps } = useAccordion(
    { ...ownProps, children },
    state,
    ref
  );

  return (
    <Box {...accordionProps} ref={ref} {...ownProps}>
      {[...state.collection].map(item => (
        <AccordionItem
          key={item.key}
          title={item.props.title}
          item={item}
          state={state}
          stretch={item.props.stretch}
          variant={item.props.variant}
          size={item.props.size}
        />
      ))}
    </Box>
  );
};

export interface AccordionOwnItemProps<T> extends ItemProps<T> {
  stretch?: boolean;
  variant?: string;
  size?: string;
  title: string | ReactNode;
}

Accordion.Item = Item as <T>(props: AccordionOwnItemProps<T>) => JSX.Element;
