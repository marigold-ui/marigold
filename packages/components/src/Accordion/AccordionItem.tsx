import {
  Box,
  CSSObject,
  SVG,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { useAccordionItem } from '@react-aria/accordion';
import { FocusRing, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import React, { useRef } from 'react';
import { Button } from '../Button';

export interface AccordionThemeExtension
  extends ThemeExtensionsWithParts<'Accordion', ['button', 'item']> {}

export interface AccordionItemProps {
  item: Node<object>;
  state: TreeState<object>;
  css?: CSSObject;
  title: string;
  stretch?: boolean;
  variant?: string;
  size?: string;
}
export const AccordionItem = ({
  item,
  css,
  state,
  title,
  variant,
  size,
  stretch,
  ...props
}: AccordionItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const open = state.expandedKeys.has(item.key);
  const disabled = state.disabledKeys.has(item.key);

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
    disabled,
  });

  const styles = useComponentStyles(
    'Accordion',
    { variant, size },
    { parts: ['item', 'button'] }
  );

  return (
    <Box {...mergeProps(stateProps, props)}>
      <FocusRing within>
        <Box
          as={Button}
          {...mergeProps(buttonProps, stateProps, props)}
          ref={ref}
          __baseCSS={{
            border: 'none',
            width: stretch ? '100%' : undefined,
            justifyContent: stretch ? 'space-between' : 'left',
          }}
          css={styles.button}
        >
          {title}
          {!open ? (
            <SVG viewBox="0 0 24 24" aria-hidden={true}>
              <path d="M5.97563 7.125L12 13.1363L18.0244 7.125L19.875 8.97563L12 16.8506L4.125 8.97563L5.97563 7.125Z" />
            </SVG>
          ) : (
            <SVG viewBox="0 0 24 24" aria-hidden={true}>
              <path d="M5.97563 16.8506L12 10.8394L18.0244 16.8506L19.875 15L12 7.125L4.125 15L5.97563 16.8506Z" />
            </SVG>
          )}
        </Box>
      </FocusRing>

      {open && (
        <Box {...regionProps} {...focusProps} css={styles.item}>
          {item.props.children}
        </Box>
      )}
    </Box>
  );
};
