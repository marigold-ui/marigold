import { SVGProps } from 'react';

export interface IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  'width' | 'height'
> {
  size?: number | `${number}${number}` | `${number}${number}`;
}

export interface IconWithFillProps extends IconProps {
  filled?: boolean;
}
