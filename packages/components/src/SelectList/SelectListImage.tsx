import type { ImgHTMLAttributes } from 'react';
import { cn } from '@marigold/system';

export interface SelectListImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  src: string;
  alt: string;
  /**
   * Size of the image.
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large' | (string & {});
}

const sizeStyles = {
  small: 'w-8 h-8',
  default: 'w-10 h-10',
  large: 'w-16 h-16',
};

export const SelectListImage = ({
  src,
  alt,
  size = 'default',
  ...props
}: SelectListImageProps) => {
  const sizeClass = sizeStyles[size as keyof typeof sizeStyles] || size;

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'col-start-1 row-span-3 row-start-1 self-center object-contain',
        sizeClass
      )}
      {...props}
    />
  );
};
