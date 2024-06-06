import { useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface BadgeProps extends Omit<HtmlProps<'div'>, 'className'> {
  /**
   * Children of the component
   */
  children?: React.ReactNode;
  /**
   * The available variants of this component.
   */
  variant?: string;
  /**
   * The available sizes of this component.
   */
  size?: string;
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const classNames = useClassNames({ component: 'Badge', variant, size });

  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
};
