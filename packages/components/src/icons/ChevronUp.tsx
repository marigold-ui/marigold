// https://lucide.dev/icons/chevron-up
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const ChevronUp = ({ size = 24, className, ...rest }: IconProps) => {
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
      className={cn(
        'lucide lucide-chevron-up-icon lucide-chevron-up',
        className
      )}
      {...rest}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};
