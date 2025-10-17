// https://lucide.dev/icons/circle
import { cn } from '@marigold/system';
import { IconWithFillProps } from './Icons.types';

export const Circle = ({
  size = 24,
  className,
  isFilled,
  ...rest
}: IconWithFillProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('lucide lucide-circle-icon lucide-circle', className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
