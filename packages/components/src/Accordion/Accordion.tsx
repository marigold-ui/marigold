import React, { Children, ReactNode, useRef } from 'react';
import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';
import { Item } from '@react-stately/collections';
import { Box } from '@marigold/system';
import { ItemElement, ItemProps } from '@react-types/shared';
import { AccordionItem } from './AccordionItem';
import { useTabListState } from '@react-stately/tabs';
import { mergeProps } from '@react-aria/utils';
import { useMenu } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';

export interface AccordionProps
  extends Omit<AriaAccordionProps<object>, 'children'> {
  children: ItemElement<object>[] | ItemElement<object> | any;
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

  //const state = useTabListState({ ...ownProps, children });
  const state = useTreeState({
    selectionMode: 'single',
    ...(ownProps as any),
  });

  const { accordionProps } = useAccordion(
    { ...ownProps, children },
    state,
    ref
  );

  console.log(accordionProps);
  return (
    <Box {...accordionProps} ref={ref}>
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
