import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useRef,
} from 'react';
import { FocusScope } from '@react-aria/focus';
import { useMenu } from '@react-aria/menu';
import { DismissButton } from '@react-aria/overlays';
import { Item } from '@react-stately/collections';
import { useTreeState } from '@react-stately/tree';
import { CollectionElement } from '@react-types/shared';

import { ComponentProps } from '@marigold/types';

import { MenuItem } from './MenuItem';

export interface MenuContextProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  open?: boolean;
  onClose?: () => void;
}

export const MenuContext = createContext<MenuContextProps>({});
export const useMenuContext = () => useContext(MenuContext);

export interface MenuProps extends ComponentProps<'ul'> {
  children: CollectionElement<object> | CollectionElement<object>[];
}

export const Menu = (props: MenuProps) => {
  const menuContext = useMenuContext();
  const ownProps = { ...props, ...menuContext };

  const ref = useRef(null);
  const state = useTreeState(ownProps);
  const { menuProps } = useMenu(ownProps, state, ref);

  /**
   * - FocusScope: restore focus back to the trigger when menu is closed
   * - DismissButton: sllow screen reader to easily dimiss menu
   */
  return (
    <FocusScope restoreFocus>
      <div>
        <DismissButton onDismiss={ownProps.onClose} />
        <ul {...menuProps} ref={ref}>
          {[...state.collection].map(item => (
            <MenuItem
              key={item.key}
              item={item}
              state={state}
              onAction={props.onAction}
            />
          ))}
        </ul>
        <DismissButton onDismiss={ownProps.onClose} />
      </div>
    </FocusScope>
  );
};

Menu.Item = Item;
