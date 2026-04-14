import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Disclosure } from 'react-aria-components';
import { usePanelContext } from './Context';

type RemovedProps = 'isDisabled' | 'isExpanded' | 'className' | 'style';

export interface PanelCollapsibleProps extends Omit<
  RAC.DisclosureProps,
  RemovedProps
> {
  /** Whether the collapsible section is expanded (controlled). */
  expanded?: RAC.DisclosureProps['isExpanded'];
  /** Whether the collapsible section is disabled. */
  disabled?: RAC.DisclosureProps['isDisabled'];
  children: ReactNode;
}

export const PanelCollapsible = ({
  children,
  expanded,
  disabled,
  ...props
}: PanelCollapsibleProps) => {
  const { classNames } = usePanelContext();

  return (
    <Disclosure
      {...props}
      isExpanded={expanded}
      isDisabled={disabled}
      className={classNames.collapsible}
    >
      {children}
    </Disclosure>
  );
};
