import { SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number;
};

export type IconWithFillProps = IconProps & { isFilled?: boolean };
