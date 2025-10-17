// https://lucide.dev/icons/chevrons-up-down
import { cn } from '@marigold/system';
import type { IconProps } from './Icons.types';

export const ChevronsVertical = ({
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
    <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
  </svg>
);
