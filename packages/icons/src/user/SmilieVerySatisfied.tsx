import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const SmilieVerySatisfied = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M11.9906 2.625C6.81563 2.625 2.625 6.81563 2.625 12C2.625 17.1844 6.81563 21.375 11.9906 21.375C17.1656 21.375 21.375 17.1844 21.375 12C21.375 6.81563 17.175 2.625 11.9906 2.625ZM12 19.5C7.85625 19.5 4.5 16.1438 4.5 12C4.5 7.85625 7.85625 4.5 12 4.5C16.1438 4.5 19.5 7.85625 19.5 12C19.5 16.1438 16.1438 19.5 12 19.5ZM13.9313 11.0625L12.9375 10.0687L14.925 8.08125L16.9125 10.0687L15.9188 11.0625L14.925 10.0687L13.9313 11.0625ZM9.07501 10.0687L10.0688 11.0625L11.0625 10.0687L9.07501 8.08125L7.0875 10.0687L8.08125 11.0625L9.07501 10.0687ZM16.7906 13.875C16.0406 15.7875 14.1844 17.1562 12 17.1562C9.81562 17.1562 7.95937 15.7875 7.20937 13.875H16.7906Z" />
    </SVG>
  )
);
