import React, { Key, useRef } from 'react';
import { FocusScope } from '@react-aria/focus';
import { useMenu } from '@react-aria/menu';
import { DismissButton } from '@react-aria/overlays';
import { Item } from '@react-stately/collections';
import { useTreeState } from '@react-stately/tree';
import { CollectionElement } from '@react-types/shared';

import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { useMenuContext } from './Context';
import { MenuTrigger } from './MenuTrigger';
import { MenuItem } from './MenuItem';
import { useSyncRef } from '@react-aria/utils';

// Theme Extension
// ---------------
export interface MenuThemeExtension
  extends ThemeExtensionsWithParts<'Menu', ['container', 'item']> {}

// Props
// ---------------
export interface MenuProps
  extends Omit<ComponentProps<'ul'>, 'onSelect' | 'size'> {
  children: CollectionElement<object> | CollectionElement<object>[];
  variant?: string;
  size?: string;
  onSelect?: (key: Key) => void;
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

  /**
   * - FocusScope: restore focus back to the trigger when menu is closed
   * - DismissButton: allow screen reader to easily dimiss menu
   */
  return (
    <div>
      <DismissButton onDismiss={ownProps.onClose} />
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
        {[...state.collection].map(item => (
          <MenuItem
            key={item.key}
            item={item}
            state={state}
            onAction={props.onSelect}
            css={styles.item}
          />
        ))}
      </Box>
      <DismissButton onDismiss={ownProps.onClose} />
    </div>
  );
};

Menu.Trigger = MenuTrigger;
Menu.Item = Item;
