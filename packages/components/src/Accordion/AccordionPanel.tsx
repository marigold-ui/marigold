import { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { useAccordionContext } from './AccordionContext';

export interface AccordionPanelProps {
  children?: ReactNode;
}

export const AccordionPanel = ({ children }: AccordionPanelProps) => {
  const { classNames } = useAccordionContext();
  return (
    <DisclosurePanel className={classNames.panel}>
      <div className={classNames.content}>{children}</div>
    </DisclosurePanel>
  );
};
