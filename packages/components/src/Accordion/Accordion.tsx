import React, { useRef } from 'react';
import { AriaAccordionProps, useAccordion } from '@react-aria/accordion';
import { useTreeState } from '@react-stately/tree';
import { AccordionItem } from './AccordionItem';
import { Item } from '@react-stately/collections';
import { ThemeExtensionsWithParts, useComponentStyles } from '@marigold/system';
import { CollectionElement } from '@react-types/shared';
import { filterDOMProps } from '@react-aria/utils';

// Theme Extension
// ---------------
export interface AccordionThemeExtension
  extends ThemeExtensionsWithParts<'Accordion', ['button', 'icon', 'item']> {}

export interface AccordionProps
  extends Pick<AriaAccordionProps<object>, 'disabledKeys' | 'expandedKeys'> {
  children: CollectionElement<object> | CollectionElement<object>[];
  variant: string;
  size: string;
  stretch: boolean;
}

export const Accordion = ({
  variant,
  size,
  stretch,
  ...props
}: AccordionProps) => {
  const ownProps = { ...props } as const;
  const ref = useRef(null);
  const state = useTreeState({
    ...ownProps,
  });
  const { accordionProps } = useAccordion(ownProps, state, ref);

  const styles = useComponentStyles(
    'Accordion',
    { variant, size },
    { parts: ['icon', 'item', 'button'] }
  );

  return (
    <div {...filterDOMProps(accordionProps)} {...ownProps} ref={ref}>
      {[...state.collection].map(item => (
        <AccordionItem
          key={item.key}
          title={item.props.title}
          item={item}
          state={state}
          stretch={stretch}
          css={styles}
        />
      ))}
    </div>
  );
};

Accordion.Item = Item;
