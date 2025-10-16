// https://lucide.dev/icons/circle
import { cn } from '@marigold/system';
import { IconWithFillProps } from './Icons.types';

export const Circle = ({
  size = 24,
  filled,
  className,
  ...props
}: IconWithFillProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('shrink-0', className)}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);
