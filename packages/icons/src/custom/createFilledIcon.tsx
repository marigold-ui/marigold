import {
  type IconNode,
  type LucideIcon,
  type LucideProps,
  createLucideIcon,
} from 'lucide-react';
import type { Ref } from 'react';

export const createFilledIcon = (
  name: string,
  iconNode: IconNode
): LucideIcon => {
  const Base = createLucideIcon(name, iconNode);
  // React 19 passes `ref` as a regular prop, so no `forwardRef` is needed.
  const Icon = ({
    color,
    fill,
    ref,
    ...props
  }: Omit<LucideProps, 'ref'> & { ref?: Ref<SVGSVGElement> }) => {
    const c = fill ?? color ?? 'currentColor';
    return <Base fill={c} color={c} {...props} ref={ref} />;
  };
  Icon.displayName = name;
  return Icon as LucideIcon;
};
