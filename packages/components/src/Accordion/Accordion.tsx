import type RAC from 'react-aria-components';
import { DisclosureGroup } from 'react-aria-components/DisclosureGroup';
import { useClassNames } from '@marigold/system';
import { AccordionProvider } from './AccordionContext';
import { AccordionHeader } from './AccordionHeader';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

// Props
// ---------------
type RemovedProps = 'isDisabled';

export interface AccordionProps extends Omit<
  RAC.DisclosureGroupProps,
  RemovedProps
> {
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: 'default' | 'card' | (string & {});
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
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
