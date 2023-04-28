import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useListBoxSection } from '@react-aria/listbox';
import type { ListState } from '@react-stately/list';
import type { Node } from '@react-types/shared';

import { TVReturnType } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

import { useListBoxContext } from './Context';
import { ListBoxOption } from './ListBoxOption';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface ListSectionProps
  extends Omit<HTMLAttributes<any>, 'className'> {
  section: Node<unknown>;
  state: ListState<unknown>;
  className?: { [key: string]: TVReturnType<any, any, any, any, any, any> };
}

// Component
// ---------------
export const ListBoxSection = ({
  section,
  state,
  className,
}: ListSectionProps) => {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  // TODO: Separate style for heading/section and childs

  const { classNames } = useListBoxContext();

  console.log(classNames);

  return (
    <li className={twMerge(classNames.section())} {...itemProps}>
      {section.rendered && (
        <div className={classNames.sectionTitle()} {...headingProps}>
          {section.rendered}
        </div>
      )}
      <ul className={classNames.list()} {...groupProps}>
        {[...section.childNodes].map(node => (
          <ListBoxOption key={node.key} item={node} state={state} />
        ))}
      </ul>
    </li>
  );
};
