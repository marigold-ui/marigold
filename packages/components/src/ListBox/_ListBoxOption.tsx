import { useRef } from 'react';

import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';

import type { ListState } from '@react-stately/list';

import type { Node } from '@react-types/shared';

import { useStateProps } from '@marigold/system';

import { useListBoxContext } from './Context';

// Props
// ---------------
export interface ListBoxOptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

// Component
// ---------------
export const ListBoxOption = ({ item, state }: ListBoxOptionProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const { optionProps, isSelected, isDisabled, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  const { onPointerUp, ...props } = optionProps;
  const { classNames } = useListBoxContext();
  const stateProps = useStateProps({
    selected: isSelected,
    disabled: isDisabled,
    focusVisible: isFocused,
  });

  return (
    <li
      ref={ref}
      className={classNames.option}
      {...mergeProps(props, { onPointerDown: onPointerUp }, { ...stateProps })}
    >
      {item.props.children}
    </li>
  );
};
