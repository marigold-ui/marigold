import { DisclosureGroup } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { AccordionProvider } from './AccordionContext';
import { AccordionHeader } from './AccordionHeading';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

type RemovedProps = 'isDisabled';
export interface AccordionProps
  extends Omit<RAC.DisclosureGroupProps, RemovedProps> {
  /** Whether all items are disabled. */
  disabled?: RAC.DisclosureGroupProps['isDisabled'];
  variant?: string;
  size?: string;
}

export const Accordion = ({
  children,
  disabled,
  variant,
  size,
  ...props
}: AccordionProps) => {
  const classNames = useClassNames({ component: 'Accordion', variant, size });

  return (
    <AccordionProvider value={{ classNames }}>
      <DisclosureGroup
        {...props}
        isDisabled={disabled}
        className={classNames.container}
      >
        {children}
      </DisclosureGroup>
    </AccordionProvider>
  );
};
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionPanel;
Accordion.Item = AccordionItem;
