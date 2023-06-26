import { SVG, SVGProps } from '@marigold/system';
import { forwardRef } from 'react';

export const Logo = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    size={60}
    viewBox="0 0 139 139"
    {...props}
    ref={ref}
  >
    <title>Marigold Logo</title>
    <circle
      cx="69.08"
      cy="70.14"
      r="64.58"
      fill="#ffd170"
      stroke="#ffb136"
      strokeWidth="4"
    />
    <circle
      cx="69.08"
      cy="70.14"
      r="39.13"
      fill="#fa7475"
      stroke="#fa8888"
      strokeWidth="4"
    />
    <path
      fill="#ffd170"
      stroke="#ffb136"
      strokeOpacity=".75"
      d="m69.03 11.44.09 14.24m-.09 89.34.09 14.24m58.85-59.164-14.24.09m-90.362-.098-14.24.1M26.37 29.83l10.68 9.37m63.97 61.94 10.68 9.37m1.552-79.875-10.69 9.37m-64.49 63.428-10.68 9.37m23.004-.364-5.52 10.96M93.37 17.851l-5.52 10.96M44.35 17.8l5.52 10.96m36.75 83.05 5.52 10.97M15.253 48.308l10.97 5.52m83.838 34.525 10.96 5.52m-9.499-38.17 10.96-5.52M15.68 94.058l10.97-5.52"
    />
  </SVG>
));
