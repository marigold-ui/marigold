import React from 'react';
import { TreeState } from '@react-stately/tree';
import { useMenuSection } from '@react-aria/menu';
import { Key } from 'react';
import { MenuItem } from './MenuItem';
import { Node } from '@react-types/shared';
import { useSeparator } from '@react-aria/separator';
import { Box, CSSObject, useComponentStyles } from '@marigold/system';

interface MenuSectionProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
  css?: CSSObject;
}

const MenuSection = ({
  onAction,
  item,
  state,
  css,
}: MenuSectionProps<object>) => {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });
  let { separatorProps } = useSeparator({
    elementType: 'li',
  });

  const styles = useComponentStyles('Menu', {}, { parts: ['item'] });
  return (
    <>
      {item.key !== state.collection.getFirstKey() && (
        <Box
          as="li"
          {...separatorProps}
          __baseCSS={{
            borderTop: '1px solid gray',
            margin: '2px 5px',
          }}
        />
      )}
      <Box as="li" {...itemProps}>
        {item.rendered && (
          <Box
            as="span"
            {...headingProps}
            __baseCSS={{
              fontWeight: 'normal',
              padding: '4px 16px',
              fontSize: 'xxsmall',
              color: 'gray50',
            }}
          >
            {item.rendered}
          </Box>
        )}
        <Box
          as="ul"
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none',
          }}
          css={css}
        >
          {[...item.childNodes].map(node => {
            let item = (
              <MenuItem
                key={node.key}
                item={node}
                state={state}
                onAction={onAction}
                css={styles.item}
              />
            );

            if (node.wrapper) {
              item = node.wrapper(item);
            }

            return item;
          })}
        </Box>
      </Box>
    </>
  );
};

export default MenuSection;
