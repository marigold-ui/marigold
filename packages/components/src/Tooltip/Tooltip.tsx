import { type ReactNode, useLayoutEffect } from 'react';
import type RAC from 'react-aria-components';
import { OverlayArrow, Tooltip } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { useTooltipContext } from './Context';
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
  /**
   * Whether the element is rendered.
   */
  open?: RAC.TooltipProps['isOpen'];
}

const TooltipComp = ({
  children,
  variant,
  size,
  open,
  ...rest
}: TooltipProps) => {
  const { setOpen } = useTooltipContext();

  useLayoutEffect(() => {
    setOpen(open);
    return () => setOpen(undefined);
  }, [open, setOpen]);

  const classNames = useClassNames({ component: 'Tooltip', variant, size });

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

export { TooltipComp as Tooltip };

TooltipComp.Trigger = TooltipTrigger;
