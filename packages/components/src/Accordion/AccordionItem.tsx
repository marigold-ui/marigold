import { Disclosure } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useAccordionContext } from './AccordionContext';

type RemovedProps = 'isDisabled' | 'isExpanded';
export interface DisclosureProps
  extends Omit<RAC.DisclosureProps, RemovedProps> {
  disabled?: RAC.DisclosureProps['isDisabled'];
  expanded?: RAC.DisclosureProps['isExpanded'];
}

export const AccordionItem = ({
  children,
  disabled,
  expanded,
  ...props
}: DisclosureProps) => {
  const { classNames } = useAccordionContext();

  return (
    <Disclosure
      isDisabled={disabled}
      isExpanded={expanded}
      className={classNames.item}
      {...props}
    >
      {children}
    </Disclosure>
  );
};
