import {
  Children,
  ReactElement,
  cloneElement,
  isValidElement,
  useRef,
} from 'react';

import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';

import { Item } from '@react-stately/collections';
import { useTreeState } from '@react-stately/tree';

import { ItemElement, ItemProps } from '@react-types/shared';

import { AccordionItem } from './AccordionItem';

export interface AccordionProps
  extends Omit<
    AriaAccordionProps<object>,
    'children' | 'expandedKeys' | 'disabledKeys' | 'onExpandedChange'
  > {
  children: ItemElement<object>[] | ItemElement<object>;
  selectionMode?: string;
}

export const Accordion = ({ children, ...props }: AccordionProps) => {
  const ownProps = {
    ...props,
    // we have to do this because JSX childs are not supported
    children: Children.toArray(children).map(child => {
      if (!isValidElement(child)) {
        return child;
      }
      return cloneElement(child, {
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
    <div {...accordionProps} ref={ref}>
      {[...state.collection].map(item => (
        <AccordionItem
          key={item.key}
          title={item.props.title}
          item={item}
          state={state}
          variant={item.props.variant}
          size={item.props.size}
        />
      ))}
    </div>
  );
};

export interface AccordionOwnItemProps<T> extends ItemProps<T> {
  variant?: string;
  size?: string;
  title: string | ReactElement;
}

Accordion.Item = Item as <T>(props: AccordionOwnItemProps<T>) => JSX.Element;
