import React, { Key, useRef } from 'react';
import { useMenu } from '@react-aria/menu';
import { Item, Section } from '@react-stately/collections';
import { useTreeState } from '@react-stately/tree';
import { CollectionElement } from '@react-types/shared';

import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { useMenuContext } from './Context';
import { MenuTrigger } from './MenuTrigger';
import { MenuItem } from './MenuItem';
import { useSyncRef } from '@react-aria/utils';
import MenuSection from './MenuSection';

// Theme Extension
// ---------------
export interface MenuThemeExtension
  extends ThemeExtensionsWithParts<'Menu', ['container', 'item', 'section']> {}

// Props
// ---------------
export interface MenuProps extends Omit<HtmlProps<'ul'>, 'onSelect' | 'size'> {
  children: CollectionElement<object> | CollectionElement<object>[];
  variant?: string;
  size?: string;
  onAction?: (key: Key) => void;
}

// Component
// ---------------
export const Menu = ({ variant, size, ...props }: MenuProps) => {
  const { ref: scrollRef, ...menuContext } = useMenuContext();
  const ownProps = { ...props, ...menuContext };

  const ref = useRef(null);
  const state = useTreeState({ ...ownProps, selectionMode: 'none' });
  const { menuProps } = useMenu(ownProps, state, ref);

  useSyncRef({ ref: scrollRef }, ref);

  const styles = useComponentStyles(
    'Menu',
    { variant, size },
    { parts: ['container', 'item'] }
  );

  return (
    <Box
      as="ul"
      ref={ref}
      __baseCSS={{
        listStyle: 'none',
        p: 0,
        overflowWrap: 'break-word',
      }}
      css={styles.container}
      {...menuProps}
    >
      {[...state.collection].map(item => {
        if (item.type === 'section') {
          return (
            <MenuSection
              key={item.key}
              item={item}
              state={state}
              onAction={props.onAction}
            />
          );
        }
        return (
          <MenuItem
            key={item.key}
            item={item}
            state={state}
            onAction={props.onAction}
            css={styles.item}
          />
        );
      })}
    </Box>
  );
};

Menu.Trigger = MenuTrigger;
Menu.Item = Item;
Menu.Section = Section;
