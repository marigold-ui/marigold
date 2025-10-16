// https://lucide.dev/icons/check
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const Check = ({ size = 24, className, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-check-icon lucide-check', className)}
    {...rest}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
