import React from 'react';
import { Key } from 'react';

import { useMenuSection } from '@react-aria/menu';

import { TreeState } from '@react-stately/tree';

import { Node } from '@react-types/shared';

import { useClassNames } from '@marigold/system';

import { Divider } from '../Divider';
import { MenuItem } from './MenuItem';

interface MenuSectionProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
}

const MenuSection = ({ onAction, item, state }: MenuSectionProps<object>) => {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const className = useClassNames({ component: 'Menu' });
  return (
    <>
      {item.key !== state.collection.getFirstKey() && (
        <li>
          <Divider variant="section" />
        </li>
      )}
      <ul {...itemProps}>
        {item.rendered && (
          <span {...headingProps} className={className.section}>
            {item.rendered}
          </span>
        )}
        <li {...groupProps} className="pb-1">
          {[...item.props.children].map(node => (
            <MenuItem
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
              className={className.item}
            />
          ))}
        </li>
      </ul>
    </>
  );
};

export default MenuSection;
