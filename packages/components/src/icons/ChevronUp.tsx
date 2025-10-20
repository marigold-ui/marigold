// https://lucide.dev/icons/chevron-up
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const ChevronUp = ({ size = 24, className, ...props }: IconProps) => (
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
    <path d="m18 15-6-6-6 6" />
  </svg>
);
