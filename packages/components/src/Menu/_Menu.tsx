import { Key, useRef } from 'react';

import { useMenu } from '@react-aria/menu';
import { useSyncRef } from '@react-aria/utils';

import { Item, Section } from '@react-stately/collections';
import { useTreeState } from '@react-stately/tree';

import { CollectionElement } from '@react-types/shared';

import { useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

import { useMenuContext } from './Context';
import { MenuItem } from './_MenuItem';
import MenuSection from './_MenuSection';
import { MenuTrigger } from './_MenuTrigger';

// Props
// ---------------
export interface MenuProps
  extends Omit<HtmlProps<'ul'>, 'onSelect' | 'size' | 'className'> {
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

  const classNames = useClassNames({ component: 'Menu', variant, size });

  return (
    <ul ref={ref} className={classNames.container} {...menuProps}>
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
            className={classNames.item}
          />
        );
      })}
    </ul>
  );
};

Menu.Trigger = MenuTrigger;
Menu.Item = Item;
Menu.Section = Section;
