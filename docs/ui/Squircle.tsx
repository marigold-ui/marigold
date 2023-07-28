import { SVG, type SVGProps } from '@marigold/system';

export interface SquircleProps extends SVGProps {}

export const Squircle = ({ size, ...props }: SquircleProps) => (
  <SVG viewBox="0 0 150 150" {...props} size={30}>
    <path
      fill="url(#a)"
      d="M.75 74.74C.75 19.8 19.31 1.48 75 1.48s74.25 18.31 74.25 73.26S130.69 148 75 148 .75 129.69.75 74.74"
    />
    <defs>
      <linearGradient
        id="a"
        x1="0"
        x2="1"
        y1="0"
        y2="0"
        spreadMethod="pad"
        gradientTransform="rotate(65)"
      >
        <stop offset=".01" stopColor="hsl(29, 37%, 70%)" />
        <stop offset="1" stopColor="hsl(29, 37%, 40%)" />
      </linearGradient>
    </defs>
  </SVG>
);
