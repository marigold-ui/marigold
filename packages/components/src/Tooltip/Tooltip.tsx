import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { OverlayArrow, Tooltip } from 'react-aria-components';
import { UNSAFE_PortalProvider } from '@react-aria/overlays';
import { cn, useClassNames } from '@marigold/system';
import { usePortalContainer } from '../Provider';
import { TooltipTrigger } from './TooltipTrigger';

type RemovedProps = 'className' | 'isOpen' | 'style';

export interface TooltipProps extends Omit<RAC.TooltipProps, RemovedProps> {
  /**
   * The children of the component.
   */
  children?: ReactNode;
  variant?: string;
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
  const portal = usePortalContainer();

  return (
    <UNSAFE_PortalProvider
      getContainer={() => (portal instanceof HTMLElement ? portal : null)}
    >
      <Tooltip {...props} className={cn('group/tooltip', classNames.container)}>
        <OverlayArrow className={classNames.arrow}>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        {children}
      </Tooltip>
    </UNSAFE_PortalProvider>
  );
};

export { _Tooltip as Tooltip };

_Tooltip.Trigger = TooltipTrigger;
