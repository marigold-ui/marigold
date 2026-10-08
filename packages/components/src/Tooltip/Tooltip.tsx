import { type ReactNode, use } from 'react';
import type RAC from 'react-aria-components';
import {
  OverlayArrow,
  Tooltip,
  TooltipTriggerStateContext,
} from 'react-aria-components/Tooltip';
import { cn, useClassNames } from '@marigold/system';
import { TooltipArrow } from './TooltipArrow';
import { TooltipTrigger } from './TooltipTrigger';

type RemovedProps =
  'className' | 'isOpen' | 'defaultOpen' | 'onOpenChange' | 'style';

export interface TooltipProps extends Omit<RAC.TooltipProps, RemovedProps> {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  variant?: 'default' | 'white' | (string & {});
  size?: string;
}

const _Tooltip = ({ children, variant, size, ...rest }: TooltipProps) => {
  const classNames = useClassNames({ component: 'Tooltip', variant, size });
  const state = use(TooltipTriggerStateContext);

  if (state && !state.isOpen) return null;

  return (
    <Tooltip
      {...rest}
      className={cn('group/tooltip z-30', classNames.container)}
    >
      <OverlayArrow className={classNames.arrow}>
        <TooltipArrow />
      </OverlayArrow>
      {children}
    </Tooltip>
  );
};

export { _Tooltip as Tooltip };

_Tooltip.Trigger = TooltipTrigger;
