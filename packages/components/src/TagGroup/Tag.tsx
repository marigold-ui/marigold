import React from 'react';
import { AriaTagProps, useTag } from '@react-aria/tag';
import { useFocusRing } from '@react-aria/focus';

import { Button } from '../Button';
import { ListState } from '@react-stately/list';

// Props
// ---------------
export interface TagProps extends AriaTagProps<object> {
  state: ListState<object>;
}

// Component
// ---------------
export const Tag = ({
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

  return (
    <span ref={ref} {...rowProps} {...focusProps}>
      <div {...gridCellProps}>
        <span {...labelProps}>{item.rendered}</span>
        {allowsRemoving && <Button {...removeButtonProps}>❎</Button>}
      </div>
    </span>
  );
};
