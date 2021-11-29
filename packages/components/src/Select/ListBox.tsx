import React, { useRef } from 'react';
import { useListBox } from '@react-aria/listbox';
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';

import { Box } from '../Box';
import { Option } from './Option';
import { ListBoxSection } from './ListBoxSection';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  state: ListState<unknown>;
  error?: boolean;
}

export const ListBox = (props: ListBoxProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const { state, error } = props;
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <Box
      as="ul"
      css={{
        listStyle: 'none',
      }}
      {...listBoxProps}
      variant={error ? 'select.listbox.error' : 'select.listbox'}
      ref={ref}
    >
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <ListBoxSection key={item.key} section={item} state={state} />
        ) : (
          <Option key={item.key} item={item} state={state} />
        )
      )}
    </Box>
  );
};
