// https://lucide.dev/icons/arrow-down-wide-narrow
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const SortDescending = ({
  size = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('shrink-0', className)}
    {...props}
  >
    <path d="M3 16l4 4 4-4m-4 4V4m4 0h10M11 8h7m-7 4h4" />
  </svg>
);
