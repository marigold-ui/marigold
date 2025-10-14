import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { OverlayArrow, Tooltip } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronDown } from '../icons/ChevronDown';
import { TooltipTrigger } from './TooltipTrigger';

type RemovedProps = 'className' | 'isOpen' | 'style';

export interface TooltipProps extends Omit<RAC.TooltipProps, RemovedProps> {
  /**
   * The children of the component.
   */
  children?: ReactNode;
  variant?: 'default' | 'white' | (string & {});
  size?: string;
  /**
   * Whether the element is rendered.
   */
  open?: RAC.TooltipProps['isOpen'];
}

const _Tooltip = ({ children, variant, size, open, ...rest }: TooltipProps) => {
  const props = {
    ...rest,
    isOpen: open,
  };
  const classNames = useClassNames({ component: 'Tooltip', variant, size });

  return (
    <Tooltip {...props} className={cn('group/tooltip', classNames.container)}>
      <OverlayArrow className={classNames.arrow}>
        <ChevronDown size={8} fill={'inherit'} viewBox="0 12 24 24" />
      </OverlayArrow>
      {children}
    </Tooltip>
  );
};

export { _Tooltip as Tooltip };

_Tooltip.Trigger = TooltipTrigger;
