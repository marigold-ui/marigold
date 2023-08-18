import React from 'react';
import { useRef } from 'react';

import { useFocus, useHover } from '@react-aria/interactions';
import { useTab } from '@react-aria/tabs';
import { mergeProps } from '@react-aria/utils';

import { TabListState } from '@react-stately/tabs';

import { Node } from '@react-types/shared';

import { cn, useStateProps } from '@marigold/system';

import { useTabContext } from './Context';

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
    isDisabled: (disabled as boolean) || isSelected,
  });
  const { focusProps } = useFocus({});
  const stateProps = useStateProps({ active: isSelected, hover: isHovered });
  const { classNames } = useTabContext();

  return (
    <div
      className={cn(
        'flex cursor-pointer justify-center aria-disabled:cursor-not-allowed',
        classNames.tab
      )}
      {...mergeProps(tabProps, stateProps, focusProps, hoverProps)}
      ref={ref}
    >
      {rendered}
    </div>
  );
};
