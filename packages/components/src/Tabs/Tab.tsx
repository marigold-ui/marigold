import React from 'react';
import { useRef } from 'react';
import { Box, useStateProps } from '@marigold/system';
import { useTab } from '@react-aria/tabs';
import { useFocus, useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useTabContext } from './Context';
import { Node } from '@react-types/shared';
import { TabListState } from '@react-stately/tabs';

export interface TabProps {
  item: Node<object>;
  state: TabListState<object>;
}

export const Tab = ({ item, state }: TabProps) => {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps, isSelected } = useTab({ key }, state, ref);
  const disabled = tabProps['aria-disabled'];
  const { hoverProps, isHovered } = useHover({
    isDisabled: disabled as boolean,
  });
  const { focusProps } = useFocus({});
  const stateProps = useStateProps({ active: isSelected, hover: isHovered });
  const { styles } = useTabContext();
  return (
    <Box
      className={disabled ? 'disabled' : ''}
      __baseCSS={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        justifyContent: 'center',
      }}
      as="div"
      css={styles.tab}
      {...mergeProps(tabProps, stateProps, focusProps, hoverProps)}
      ref={ref}
    >
      {rendered}
    </Box>
  );
};
