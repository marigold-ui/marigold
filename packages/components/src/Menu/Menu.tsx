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
import { MenuItem } from './MenuItem';

// Theme Extension
// ---------------
export interface MenuThemeExtension
  extends ThemeExtensionsWithParts<'Menu', ['menu', 'item']> {}

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
  const { triggerWidth, ...menuContext } = useMenuContext();
  const ownProps = { ...props, ...menuContext };

  const ref = useRef(null);
  const state = useTreeState({ ...ownProps });
  const { menuProps } = useMenu(ownProps, state, ref);

  const styles = useComponentStyles(
    'Menu',
    { variant, size },
    { parts: ['menu', 'item'] }
  );

  /**
   * - FocusScope: restore focus back to the trigger when menu is closed
   * - DismissButton: sllow screen reader to easily dimiss menu
   */
  return (
    <FocusScope restoreFocus>
      <div>
        <DismissButton onDismiss={ownProps.onClose} />
        <Box
          as="ul"
          ref={ref}
          style={{ width: triggerWidth }}
          __baseCSS={{ overflowWrap: 'break-word' }}
          css={styles.menu}
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
    </FocusScope>
  );
};

Menu.Item = Item;
