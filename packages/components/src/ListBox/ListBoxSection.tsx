import React from 'react';
import { useListBoxSection } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { ListBoxOption } from './ListBoxOption';
import { Box, CSSObject } from '@marigold/system';

// Props
// ---------------
export interface ListSectionProps {
  css?: CSSObject;
  section: Node<unknown>;
  state: ListState<unknown>;
}

// Component
// ---------------
export const ListBoxSection = ({ css, section, state }: ListSectionProps) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  // TODO: Separate style for heading/section and childs
  return (
    <Box as="li" {...itemProps}>
      {section.rendered && <span {...headingProps}>{section.rendered}</span>}
      <Box as="ul" css={css} {...groupProps}>
        {[...section.childNodes].map(node => (
          <ListBoxOption key={node.key} item={node} state={state} />
        ))}
      </Box>
    </Box>
  );
};
