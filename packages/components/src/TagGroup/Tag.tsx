import React from 'react';
import { AriaTagProps, useTag } from '@react-aria/tag';
import { useFocusRing } from '@react-aria/focus';

import { Button } from '../Button';
import { ListState } from '@react-stately/list';
import {
  Box,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';
import { mergeProps } from '@react-aria/utils';

// Theme Extension
// ---------------
export interface TagThemeExtension
  extends ThemeExtensionsWithParts<'Tag', ['row', 'gridCell', 'closeButton']> {}

// Props
// ---------------
export interface TagProps extends AriaTagProps<object> {
  state: ListState<object>;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Tag = ({
  variant,
  size,
  item,
  state,
  allowsRemoving,
  onRemove,
  ...rest
}: TagProps) => {
  const props = {
    item,
    //state,
    allowsRemoving,
    onRemove,
    ...rest,
  } satisfies AriaTagProps<object>;

  let ref = React.useRef(null);
  let { focusProps } = useFocusRing({ within: true });

  const { rowProps, gridCellProps, labelProps, removeButtonProps } = useTag(
    {
      ...props,
      item,
      allowsRemoving,
      onRemove,
    },
    state,
    ref
  );

  const styles = useComponentStyles(
    'Tag',
    { variant, size },
    { parts: ['row', 'gridCell', 'closeButton'] }
  );

  return (
    <Box
      as="span"
      ref={ref}
      {...mergeProps(rowProps, focusProps)}
      css={styles.row}
    >
      <Box as="div" {...gridCellProps} css={styles.gridCell}>
        <span {...labelProps}>{item.rendered}</span>
        {allowsRemoving && (
          <Box as={Button} {...removeButtonProps} css={styles.closeButton}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              ></path>
            </svg>
          </Box>
        )}
      </Box>
    </Box>
  );
};
