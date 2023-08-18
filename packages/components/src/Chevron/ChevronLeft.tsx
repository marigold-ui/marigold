import React, { forwardRef } from 'react';

import { SVG, SVGProps as SVGPropsType } from '@marigold/system';

interface SVGProps extends SVGPropsType {
  className?: string;
}

export const ChevronLeft = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <SVG className={className} {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M16.8506 18.0244L10.8394 12L16.8506 5.97563L15 4.125L7.125 12L15 19.875L16.8506 18.0244Z" />
    </SVG>
  )
);
