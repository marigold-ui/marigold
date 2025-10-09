import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const SuccessFilled = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      size={20}
      viewBox="0 0 24 24"
      {...props}
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </SVG>
  )
);
