import { Separator } from 'react-aria-components/Separator';
import { cn, useClassNames } from '@marigold/system';

export interface ToolbarSeparatorProps {
  /**
   * Theme variant of the separator.
   */
  variant?: string;
  /**
   * Theme size of the separator.
   */
  size?: string;
}

/**
 * A vertical divider between groups of controls inside a horizontal `<Toolbar>`.
 * Renders a react-aria `Separator` (`role="separator"`).
 */
export const ToolbarSeparator = ({ variant, size }: ToolbarSeparatorProps) => {
  const classNames = useClassNames({
    component: 'Toolbar',
    variant,
    size,
  });

  return (
    <Separator orientation="vertical" className={cn(classNames.separator)} />
  );
};
