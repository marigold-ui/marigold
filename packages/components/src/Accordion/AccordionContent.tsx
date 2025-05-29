import { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useAccordionContext } from './AccordionContext';

export interface AccordionPanelProps {
  children?: ReactNode;
}

export const AccordionContent = ({ children }: AccordionPanelProps) => {
  const { classNames } = useAccordionContext();

  return (
    <DisclosurePanel
      // @ts-ignore
      hidden={false}
      className={cn(
        'ease-out-quad grid overflow-hidden transition-[grid-template-rows]',
        'grid-rows-[1fr] aria-hidden:grid-rows-[0fr]',
        '*:visible aria-hidden:*:invisible',
        classNames.content
      )}
    >
      <div className="min-h-0 transition-[visibility]">{children}</div>
    </DisclosurePanel>
  );
};
