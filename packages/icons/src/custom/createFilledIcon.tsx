import {
  type IconNode,
  type LucideIcon,
  type LucideProps,
  createLucideIcon,
} from 'lucide-react';
import { forwardRef } from 'react';

export const createFilledIcon = (
  name: string,
  iconNode: IconNode
): LucideIcon => {
  const Base = createLucideIcon(name, iconNode);
  const Icon = forwardRef<SVGSVGElement, LucideProps>(
    ({ color, fill, ...props }, ref) => {
      const c = fill ?? color ?? 'currentColor';
      return <Base fill={c} color={c} {...props} ref={ref} />;
    }
  );
  Icon.displayName = name;
  return Icon as LucideIcon;
};
