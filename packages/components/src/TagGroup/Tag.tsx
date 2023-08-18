import React from 'react';

import { useFocusRing } from '@react-aria/focus';
import { AriaTagProps, useTag } from '@react-aria/tag';
import { mergeProps } from '@react-aria/utils';

import { ListState } from '@react-stately/list';

import { cn, useClassNames } from '@marigold/system';

import { Button } from '../Button';

// Props
// ---------------
export interface TagProps extends AriaTagProps<object> {
  state: ListState<object>;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Tag = ({ variant, size, item, state, ...rest }: TagProps) => {
  const props: AriaTagProps<object> = {
    item,
    ...rest,
  };

  let ref = React.useRef(null);
  let { focusProps } = useFocusRing({ within: true });

  const { rowProps, gridCellProps, allowsRemoving, removeButtonProps } = useTag(
    {
      ...props,
      item,
    },
    state,
    ref
  );

  const classNames = useClassNames({ component: 'Tag', variant, size });

  return (
    <span
      ref={ref}
      {...mergeProps(rowProps, focusProps)}
      className={classNames.tag}
    >
      <div {...gridCellProps} className={classNames.gridCell}>
        <span>{item.rendered}</span>
        {allowsRemoving && (
          <Button
            {...removeButtonProps}
            className={cn('flex items-center', classNames.closeButton)}
            role="button"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </Button>
        )}
      </div>
    </span>
  );
};
