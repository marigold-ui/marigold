import {
  Box,
  CSSObject,
  SVG,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { useAccordionItem } from './useAccordionItem';
import { FocusRing, useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../Button';

export interface AccordionThemeExtension
  extends ThemeExtensionsWithParts<'Accordion', ['button', 'item']> {}

export interface AccordionItemProps {
  item: Node<object>;
  state: TreeState<object>;
  css?: CSSObject;
  title: string | ReactNode;
  stretch?: boolean;
  variant?: string;
  size?: string;
  defaultExpandedKeys?: any;
}

export const AccordionItem = ({
  item,
  state,
  css,
  title,
  variant,
  size,
  stretch = true,
  ...props
}: AccordionItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const defaultExpanded = state.expandedKeys.has(
    item.key.toString().replace('.$', '')
  );

  const expanded = state.selectionManager.isSelected(item.key);
  // const [defaultExpanded, setDefaultExpanded] = React.useState(expandedKeys);

  // const [open, setOpen] = React.useState(false);

  // useEffect(() => {
  //   if (expandedKeys) {
  //     setDefaultExpanded(false);
  //     setOpen(expandedKeys);
  //   } else {
  //     console.log('expanded', expanded);
  //     setOpen(expanded);
  //   }
  //   console.log('Open:', open, 'default:', defaultExpanded);
  // }, [expanded, defaultExpanded, expandedKeys]);
  // we have to use or own hook because it's in react-aria still issues
  const { buttonProps, regionProps } = useAccordionItem({ item }, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();

  const stateProps = useStateProps({
    focus: isFocusVisible,
    expanded: expanded || defaultExpanded,
  });

  const styles = useComponentStyles(
    'Accordion',
    { variant, size },
    { parts: ['item', 'button'] }
  );

  console.log('default:', defaultExpanded);
  console.log('expandedOpen:', expanded);
  return (
    <Box {...props}>
      <FocusRing within>
        <Box
          as={Button}
          {...mergeProps(buttonProps, stateProps, props)}
          ref={ref}
          __baseCSS={{
            border: 'none',
            p: 0,
            width: stretch ? '100%' : undefined,
            justifyContent: stretch ? 'space-between' : 'left',
          }}
          css={styles.button}
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
        </Box>
      </FocusRing>

      {expanded || defaultExpanded ? (
        <Box
          {...mergeProps(regionProps, focusProps, stateProps)}
          css={styles.item}
        >
          {item.props.children}
        </Box>
      ) : null}
    </Box>
  );
};
