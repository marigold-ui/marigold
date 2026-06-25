import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { Group } from 'react-aria-components/Group';
import { Provider } from 'react-aria-components/slots';
import { cn, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';
import { ButtonContext } from '../Button/Context';

export interface ToolbarGroupProps extends AriaLabelingProps {
  /**
   * The controls to cluster together.
   */
  children?: ReactNode;
  /**
   * Disables every nested button. Only button-type controls honour the cascade;
   * fields manage their own `disabled`. A child can re-enable with `disabled={false}`.
   */
  disabled?: boolean;
  /**
   * Theme variant of the group.
   */
  variant?: string;
  /**
   * Theme size of the group.
   */
  size?: string;
}

/**
 * A semantic cluster of related controls inside a `<Toolbar>`.
 *
 * Renders `role="group"` so assistive tech announces the controls as a unit.
 * Provide an `aria-label` (or `aria-labelledby`) to name the cluster.
 */
export const ToolbarGroup = ({
  children,
  disabled,
  variant,
  size,
  ...props
}: ToolbarGroupProps) => {
  const classNames = useClassNames({
    component: 'Toolbar',
    variant,
    size,
  });

  // Cascade `disabled` to nested buttons via ButtonContext (like ButtonGroup).
  const ctx = useMemo(() => ({ disabled }), [disabled]);

  return (
    <Provider values={[[ButtonContext, ctx]]}>
      <Group className={cn(classNames.group)} {...props}>
        {children}
      </Group>
    </Provider>
  );
};
