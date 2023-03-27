import { Box, CSSObject, SVG, useStateProps } from '@marigold/system';
import { useAccordionItem } from '@react-aria/accordion';
import { FocusRing, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import React, { useRef } from 'react';
import { Button } from '../Button';

export interface AccordionItemProps {
  item: Node<object>;
  state: TreeState<object>;
  css?: CSSObject;
  title: string;
}
export const AccordionItem = ({
  state,
  item,
  css,
  title,
  ...props
}: AccordionItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const open = state.expandedKeys.has(item.key);

  const { buttonProps, regionProps } = useAccordionItem(
    {
      item: item,
    },
    state,
    ref
  );

  const { isFocusVisible, focusProps } = useFocusRing();
  const stateProps = useStateProps({
    focus: isFocusVisible,
    expanded: open,
  });

  return (
    <Box {...focusProps}>
      <FocusRing within>
        <Box
          as={Button}
          {...mergeProps(buttonProps, stateProps)}
          ref={ref}
          __baseCSS={{ p: 0 }}
        >
          {title}
          <SVG viewBox="0 0 24 24" aria-hidden={true}>
            <path d="M5.97563 7.125L12 13.1363L18.0244 7.125L19.875 8.97563L12 16.8506L4.125 8.97563L5.97563 7.125Z" />
          </SVG>
        </Box>
      </FocusRing>
      {open && (
        <Box {...regionProps} css={css}>
          {item.props.children}
        </Box>
      )}
    </Box>
  );
};
