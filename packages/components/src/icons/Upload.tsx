// https://lucide.dev/icons/cloud-upload
import { cn } from '@marigold/system';
import type { IconProps } from './Icons.types';

export const Upload = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('shrink-0', className)}
    {...props}
  >
    <path d="M12 13v8M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242" />
    <path d="M8 17l4-4 4 4" />
  </svg>
);
