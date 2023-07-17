import React from 'react';
import { TreeState } from '@react-stately/tree';
import { useMenuSection } from '@react-aria/menu';
import { Key } from 'react';
import { MenuItem } from './MenuItem';
import { Node } from '@react-types/shared';
import { useClassNames } from '@marigold/system';
import { Divider } from '../Divider';

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
      <li {...itemProps}>
        {item.rendered && (
          <span {...headingProps} className={className.section}>
            {item.rendered}
          </span>
        )}
        <ul {...groupProps} className="pb-1">
          {[...item.childNodes].map(node => {
            let item = (
              <MenuItem
                key={node.key}
                item={node}
                state={state}
                onAction={onAction}
                className={className.item}
              />
            );
            return item;
          })}
        </ul>
      </li>
    </>
  );
};

export default MenuSection;
