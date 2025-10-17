import type { ImgHTMLAttributes } from 'react';
import { useClassNames } from '@marigold/system';

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

export const SelectListImage = ({
  src,
  alt,
  size = 'default',
  ...props
}: SelectListImageProps) => {
  const classNames = useClassNames({ component: 'SelectList', size });

  return <img src={src} alt={alt} className={classNames.image} {...props} />;
};
