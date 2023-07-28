import React from 'react';
import { useListBoxSection } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

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
  const { classNames } = useListBoxContext();
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <li className={classNames.section} {...itemProps}>
      {section.rendered && (
        <div className={classNames.sectionTitle} {...headingProps}>
          {section.rendered}
        </div>
      )}
      <ul className={classNames.list} {...groupProps}>
        {[...section.props.children].map(node => (
          <ListBoxOption key={node.key} item={node} state={state} />
        ))}
      </ul>
    </li>
  );
};
