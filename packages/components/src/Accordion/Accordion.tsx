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

import { ItemElement, ItemProps, SelectionMode } from '@react-types/shared';

import { AccordionItem } from './AccordionItem';

export interface AccordionProps
  extends Omit<
    AriaAccordionProps<object>,
    'children' | 'expandedKeys' | 'disabledKeys' | 'onExpandedChange'
  > {
  children: ItemElement<object>[] | ItemElement<object>;
  selectionMode?: SelectionMode;
}

export const Accordion = ({ children, ...props }: AccordionProps) => {
  const ownProps = {
    ...props,
    // we have to do this because JSX childs are not supported
    children: [] as any[],
  };

  //childs are pushed to children to avoid generated ids from React.Element
  Children.forEach(children, child => {
    if (isValidElement(child) && typeof child.props?.children !== 'string') {
      const clone = cloneElement(child, {
        hasChildItems: false,
      });

      ownProps.children.push(clone);
      return;
    }

    ownProps.children.push(child);
  });

  const ref = useRef(null);
  const state = useTreeState({
    selectionMode: 'single',
    ...ownProps,
  });

  const { accordionProps } = useAccordion(
    /**
     * Disable "cmd+a" (open all) hotkey for now, since it will not work
     * with forms inside the accordion. (see DSTSUP-22)
     */
    { ...ownProps, disallowSelectAll: true } as any,
    state,
    ref
  );

  // Remove onKeyDownCapture from listProps to prevent it from removing spacebar support for
  // inner elements as the Input, this event provides typeahead support for the list, but we
  // don't need it for the accordion.
  delete accordionProps.onKeyDownCapture;

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
