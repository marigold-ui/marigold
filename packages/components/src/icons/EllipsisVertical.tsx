// https://lucide.dev/icons/ellipsis-vertical
import { cn } from '@marigold/system';
import { IconProps } from './Icons.types';

export const EllipsisVertical = ({
  size = 24,
  className,
  ...rest
}: IconProps) => {
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
        'lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical',
        className
      )}
      {...rest}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
};
