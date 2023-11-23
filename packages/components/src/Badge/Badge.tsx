import { useClassNames } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface BadgeProps extends Omit<HtmlProps<'div'>, 'className'> {
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Badge = ({ variant, size, children, ...props }: BadgeProps) => {
  const classNames = useClassNames({ component: 'Badge', variant, size });
  console.log(variant, classNames);
  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
};
