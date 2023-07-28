import React, { Key, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';

import { useStateProps } from '@marigold/system';

import { useMenuContext } from './Context';

export interface MenuItemProps {
  item: Node<object>;
  state: TreeState<object>;
  onAction?: (key: Key) => void;
  className?: string;
}

export const MenuItem = ({
  item,
  state,
  onAction,
  className,
}: MenuItemProps) => {
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
  // Handles focus AND hover state
  const { isFocusVisible, focusProps } = useFocusRing();
  const stateProps = useStateProps({
    focus: isFocusVisible,
  });
  const { onPointerUp, ...props } = menuItemProps;

  return (
    <li
      ref={ref}
      className={className}
      {...mergeProps(
        props,
        { onPointerDown: onPointerUp },
        stateProps,
        focusProps
      )}
    >
      {item.props.children}
    </li>
  );
};
