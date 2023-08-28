import { ReactNode, useEffect, useRef } from 'react';

import { FocusRing, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { TreeState } from '@react-stately/tree';

import { Node } from '@react-types/shared';

import { useClassNames, useStateProps } from '@marigold/system';

import { Button } from '../Button';
import { ChevronDown, ChevronUp } from '../Chevron';
import { useAccordionItem } from './useAccordionItem';

// props
// ----------------
export interface AccordionItemProps {
  item: Node<object>;
  state: TreeState<object>;
  title: string | ReactNode;
  variant?: string;
  size?: string;
}

// component
// ---------------
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

  useEffect(() => {
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
            <ChevronUp className="h3 w-6" />
          ) : (
            <ChevronDown className="h3 w-6" />
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
