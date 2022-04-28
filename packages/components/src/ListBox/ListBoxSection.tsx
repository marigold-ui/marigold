import React from 'react';
import { useListBoxSection } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { Box } from '@marigold/system';

import { useListBoxContext } from './Context';
import { ListBoxOption } from './ListBoxOption';

// Props
// ---------------
export interface ListSectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

// Component
// ---------------
export const ListBoxSection = ({ section, state }: ListSectionProps) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  // TODO: Separate style for heading/section and childs

  const { styles } = useListBoxContext();

  return (
    <Box as="li" css={styles.section} {...itemProps}>
      {section.rendered && (
        <Box css={styles.sectionTitle} {...headingProps}>
          {section.rendered}
        </Box>
      )}
      <Box as="ul" {...groupProps}>
        {[...section.childNodes].map(node => (
          <ListBoxOption key={node.key} item={node} state={state} />
        ))}
      </Box>
    </Box>
  );
};
