import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Help = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    ref={ref}
  >
    <circle cx="12" cy="12" r="10" fill="none" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" fill="none" />
    <path d="M12 17h.01" />
  </SVG>
));
