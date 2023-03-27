import { useStateProps } from '@marigold/system';
import { useAccordionItem } from '@react-aria/accordion';
import { FocusRing, useFocusRing } from '@react-aria/focus';
import { useLocale } from '@react-aria/i18n';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import React, { useRef } from 'react';

export interface AccordionItemProps {
  item: Node<object>;
  state: TreeState<object>;
}
export const AccordionItem = ({
  state,
  item,
  ...props
}: AccordionItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isOpen = state.expandedKeys.has(item.key);

  const { buttonProps, regionProps } = useAccordionItem(
    {
      item: item,
    },
    state,
    ref
  );

  // Handles focus AND hover state
  const { isFocusVisible, focusProps } = useFocusRing();
  const stateProps = useStateProps({
    focus: isFocusVisible,
  });
  let { direction } = useLocale();

  return (
    <div>
      <h3>
        <FocusRing within>
          <button
            {...mergeProps(buttonProps, hoverProps)}
            ref={ref}
            className={classNames(styles, 'spectrum-Accordion-itemHeader', {
              'is-hovered': isHovered,
            })}
          >
            {direction === 'ltr' ? (
              <ChevronRightMedium
                aria-hidden="true"
                UNSAFE_className={classNames(
                  styles,
                  'spectrum-Accordion-itemIndicator'
                )}
              />
            ) : (
              <ChevronLeftMedium
                aria-hidden="true"
                UNSAFE_className={classNames(
                  styles,
                  'spectrum-Accordion-itemIndicator'
                )}
              />
            )}
            {item.props.title}
          </button>
        </FocusRing>
      </h3>
      <div
        {...regionProps}
        className={classNames(styles, 'spectrum-Accordion-itemContent')}
      >
        {item.props.children}
      </div>
    </div>
  );
};
