import type RAC from 'react-aria-components';
import { DisclosureGroup } from 'react-aria-components';
import { useClassNames } from '@marigold/system';
import { AccordionProvider } from './AccordionContext';
import { AccordionHeader } from './AccordionHeader';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

// Props
// ---------------
type RemovedProps = 'isDisabled';

export interface AccordionProps
  extends Omit<RAC.DisclosureGroupProps, RemovedProps> {
  variant?: 'default' | 'card' | (string & {});
  size?: string;
  /** Whether all items are disabled. */
  disabled?: RAC.DisclosureGroupProps['isDisabled'];
  /** Whether the header should stick to the top when scrolling. */
  stickyHeader?: boolean;
  /** Position of the icon in the header. */
  iconPosition?: 'right' | 'left';
}

// Component
// ---------------
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
