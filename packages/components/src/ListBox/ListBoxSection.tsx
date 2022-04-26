import React from 'react';
import { useListBoxSection } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { ListBoxOption } from './ListBoxOption';
import { Box } from '@marigold/system';

export interface ListSectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

export const ListBoxSection = ({ section, state }: ListSectionProps) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <Box as="li" {...itemProps}>
      {section.rendered && <span {...headingProps}>{section.rendered}</span>}
      <Box as="ul" {...groupProps}>
        {[...section.childNodes].map(node => (
          <ListBoxOption key={node.key} item={node} state={state} />
        ))}
      </Box>
    </Box>
  );
};
