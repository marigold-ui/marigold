import type RAC from 'react-aria-components';
import { DisclosureGroup } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { AccordionProvider } from './AccordionContext';
import { AccordionHeader } from './AccordionHeader';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

type RemovedProps = 'isDisabled';
export interface AccordionProps
  extends Omit<RAC.DisclosureGroupProps, RemovedProps> {
  /** Whether all items are disabled. */
  disabled?: RAC.DisclosureGroupProps['isDisabled'];
  variant?: 'default' | 'card' | (string & {});
  size?: string;
  stickyHeader?: boolean;
  iconPosition?: 'right' | 'left';
}

export const Accordion = ({
  children,
  disabled,
  variant,
  size,
  stickyHeader = false,
  iconPosition = 'right',
  ...props
}: AccordionProps) => {
  const classNames = useClassNames({ component: 'Accordion', variant, size });

  return (
    <AccordionProvider
      value={{ classNames, stickyHeader: stickyHeader, iconPosition }}
    >
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
