import React, { Key, useRef } from 'react';
import { useFocus } from '@react-aria/interactions';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';

import { Box, CSSObject, useStateProps } from '@marigold/system';

import { useMenuContext } from './Context';

export interface MenuItemProps {
  item: Node<object>;
  state: TreeState<object>;
  onAction?: (key: Key) => void;
  css?: CSSObject;
}

export const MenuItem = ({ item, state, onAction, css }: MenuItemProps) => {
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
  const [isFocused, setFocused] = React.useState(false);
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  const stateProps = useStateProps({
    focus: isFocused,
  });

  return (
    <Box
      as="li"
      ref={ref}
      css={css}
      {...mergeProps(menuItemProps, focusProps)}
      {...stateProps}
    >
      {item.rendered}
    </Box>
  );
};
