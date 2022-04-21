import React, { Key, useRef } from 'react';
import { useFocus } from '@react-aria/interactions';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';

import { useMenuContext } from './Context';

export interface MenuItemProps {
  item: Node<object>;
  state: TreeState<object>;
  // isVirtualized?: boolean;
  onAction?: (key: Key) => void;
}

export const MenuItem = ({ item, state, onAction }: MenuItemProps) => {
  const ref = useRef(null);
  const { onClose } = useMenuContext();

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction,
      onClose,
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  const [isFocused, setFocused] = React.useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isFocused ? 'white' : 'black',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      {item.rendered}
    </li>
  );
};
