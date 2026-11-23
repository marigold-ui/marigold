import { type ReactNode, use } from 'react';
import type RAC from 'react-aria-components';
import {
  OverlayArrow,
  Tooltip as RACTooltip,
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
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: 'default' | 'white' | (string & {});
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
  size?: string;
}

const Tooltip = ({ children, variant, size, ...rest }: TooltipProps) => {
  const classNames = useClassNames({ component: 'Tooltip', variant, size });
  const state = use(TooltipTriggerStateContext);

  if (state && !state.isOpen) return null;

  return (
    <RACTooltip
      {...rest}
      className={cn('group/tooltip z-30', classNames.container)}
    >
      <OverlayArrow className={classNames.arrow}>
        <TooltipArrow />
      </OverlayArrow>
      {children}
    </RACTooltip>
  );
};

export { Tooltip };

Tooltip.Trigger = TooltipTrigger;
