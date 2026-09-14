import { type ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { OverlayArrow, Tooltip } from 'react-aria-components/Tooltip';
import { cn, useClassNames } from '@marigold/system';
import { useContainerPadding } from '../Overlay/containerPadding';
import { TooltipArrow } from './TooltipArrow';
import { TooltipTrigger } from './TooltipTrigger';

type RemovedProps = 'className' | 'isOpen' | 'style';

export interface TooltipProps extends Omit<RAC.TooltipProps, RemovedProps> {
  /**
   * The children of the component.
   */
  children?: ReactNode;
  variant?: 'default' | 'white' | (string & {});
  size?: string;
}

const _Tooltip = ({
  children,
  variant,
  size,
  containerPadding,
  ...rest
}: TooltipProps) => {
  const classNames = useClassNames({ component: 'Tooltip', variant, size });
  const measured = useContainerPadding();

  return (
    <Tooltip
      {...rest}
      containerPadding={containerPadding ?? measured}
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
