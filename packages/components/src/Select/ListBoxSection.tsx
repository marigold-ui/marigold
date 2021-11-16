import React from 'react';
import { useListBoxSection } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { Box } from '../Box';
import { Option } from './Option';

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

export const ListBoxSection = ({ section, state }: SectionProps) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <Box
      as="li"
      {...itemProps}
      css={{
        cursor: 'not-allowed',
      }}
    >
      {section.rendered && (
        <Box as="span" {...headingProps} variant={'select.section'}>
          {section.rendered}
        </Box>
      )}
      <Box as="ul" {...groupProps}>
        {[...section.childNodes].map(node => (
          <Option key={node.key} item={node} state={state} />
        ))}
      </Box>
    </Box>
  );
};
