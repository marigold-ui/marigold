// https://lucide.dev/icons/minus
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const Minus = ({ size = 24, className, ...rest }: IconProps) => {
  return (
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
      className={cn('lucide lucide-minus-icon lucide-minus', className)}
      {...rest}
    >
      <path d="M5 12h14" />
    </svg>
  );
};
