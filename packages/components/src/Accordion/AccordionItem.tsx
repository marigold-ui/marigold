import React, { ReactNode, useRef } from 'react';
import { FocusRing, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';

import { SVG, useClassNames, useStateProps } from '@marigold/system';

import { useAccordionItem } from './useAccordionItem';
import { Button } from '../Button';

export interface AccordionItemProps {
  item: Node<object>;
  state: TreeState<object>;
  title: string | ReactNode;
  variant?: string;
  size?: string;
}

export const AccordionItem = ({
  item,
  state,
  title,
  variant,
  size,
  ...props
}: AccordionItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const defaultExpanded = state.expandedKeys.has(
    item.key.toString().replace('.$', '')
  );

  const expanded = state.selectionManager.isSelected(item.key);

  React.useEffect(() => {
    // clear both default values and expanded also check if multiple or single mode
    if (defaultExpanded) {
      if (state.selectionManager.selectionMode === 'multiple') {
        state.expandedKeys.forEach(key => {
          state.selectionManager.select(key);
        });
      } else {
        state.expandedKeys.clear();
        state.selectionManager.toggleSelection(item.key);
      }
    }
  }, [defaultExpanded, item.key, state.expandedKeys, state.selectionManager]);

  // we have to use or own hook because it's in react-aria still issues
  const { buttonProps, regionProps } = useAccordionItem({ item }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const stateProps = useStateProps({
    focus: isFocusVisible,
    expanded: defaultExpanded || expanded,
  });

  const classNames = useClassNames({ component: 'Accordion', variant, size });

  return (
    <div className="flex flex-col" {...props}>
      <FocusRing within>
        <Button
          className={classNames.button}
          {...mergeProps(buttonProps, stateProps, props)}
          ref={ref}
          aria-label={item.textValue}
        >
          {title}
          {!expanded ? (
            <SVG viewBox="0 0 24 24" aria-hidden={true}>
              <path d="M5.97563 7.125L12 13.1363L18.0244 7.125L19.875 8.97563L12 16.8506L4.125 8.97563L5.97563 7.125Z" />
            </SVG>
          ) : (
            <SVG viewBox="0 0 24 24" aria-hidden={true}>
              <path d="M5.97563 16.8506L12 10.8394L18.0244 16.8506L19.875 15L12 7.125L4.125 15L5.97563 16.8506Z" />
            </SVG>
          )}
        </Button>
      </FocusRing>
      {expanded || defaultExpanded ? (
        <div
          {...mergeProps(regionProps, focusProps, stateProps)}
          className={classNames.item}
        >
          {item.props.children}
        </div>
      ) : null}
    </div>
  );
};
