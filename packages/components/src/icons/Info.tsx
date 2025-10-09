import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Info = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
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
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </SVG>
));
