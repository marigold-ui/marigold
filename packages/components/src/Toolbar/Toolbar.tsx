import { type ReactNode, type Ref, useEffect } from 'react';
import type RAC from 'react-aria-components';
import { Toolbar as RACToolbar } from 'react-aria-components/Toolbar';
import { useObjectRef } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import type { AriaLabelingProps } from '@marigold/types';
import type { SlotProps } from '../types';
import { ToolbarActions } from './ToolbarActions';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarSeparator } from './ToolbarSeparator';

// Horizontal-only in v1; theming via `variant`/`size`, not `className`/`style`.
type RemovedProps =
  | 'className'
  | 'style'
  | 'isDisabled'
  | 'orientation'
  | 'slot';

export interface ToolbarProps
  extends Omit<RAC.ToolbarProps, RemovedProps>, AriaLabelingProps, SlotProps {
  /**
   * The controls to render (fields, buttons, `Toolbar.Group`,
   * `Toolbar.Separator`). Wrap the trailing buttons in `Toolbar.Actions` to let
   * them collapse into a "More" menu when space runs short; everything else
   * stays put, so place inputs like a search field on the left.
   */
  children?: ReactNode;
  /**
   * Theme variant of the toolbar. Styles the bar itself; it is not cascaded to
   * the children, which keep their own `variant`/`size`.
   */
  variant?: string;
  /**
   * Theme size of the toolbar (controls the bar's own spacing/density).
   */
  size?: string;
  ref?: Ref<HTMLDivElement>;
}

interface ToolbarComponent {
  (props: ToolbarProps): ReactNode;
  Actions: typeof ToolbarActions;
  Group: typeof ToolbarGroup;
  Separator: typeof ToolbarSeparator;
}

const ToolbarBase = ({
  children,
  variant,
  size,
  ref,
  ...props
}: ToolbarProps) => {
  const classNames = useClassNames({ component: 'Toolbar', variant, size });
  const toolbarRef = useObjectRef(ref);

  // Dev-only: the APG requires an accessible name. In an effect to keep render pure.
  const ariaLabel = props['aria-label'];
  const ariaLabelledby = props['aria-labelledby'];
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' &&
      !ariaLabel &&
      !ariaLabelledby
    ) {
      console.warn(
        'Marigold: <Toolbar> should have an `aria-label` or `aria-labelledby` so assistive technology can announce the region.'
      );
    }
  }, [ariaLabel, ariaLabelledby]);

  return (
    <RACToolbar
      {...props}
      ref={toolbarRef}
      orientation="horizontal"
      className={cn(classNames.container)}
    >
      {children}
    </RACToolbar>
  );
};

export const Toolbar = Object.assign(ToolbarBase, {
  Actions: ToolbarActions,
  Group: ToolbarGroup,
  Separator: ToolbarSeparator,
}) as ToolbarComponent;
