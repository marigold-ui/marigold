import React, { useRef, ReactNode } from 'react';
import { useAccordion } from '@react-aria/accordion';
import { useTreeState } from '@react-stately/tree';
import { ThemeExtensionsWithParts } from '@marigold/system';

// Theme Extension
// ---------------
export interface AccordionThemeExtension
  extends ThemeExtensionsWithParts<'Accordion', ['']> {}

export interface AccordionProps {
  children: ReactNode;
  variant: string;
  size: string;
}

export const Accordion = ({
  variant,
  size,
  children,
  ...props
}: AccordionProps) => {
  const ownProps = { ...props };
  const ref = useRef(null);
  const state = useTreeState({
    ...ownProps,
  });
  const { accordionProps } = useAccordion(props, state, domRef);
  return (
    <div {...accordionProps} ref={ref} css={styles}>
      {[...state.collection].map(item => (
        <AccordionItem key={item.key} item={item} state={state} />
      ))}
    </div>
  );
};
