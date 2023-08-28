import { forwardRef } from 'react';

import { SVG, SVGProps as SVGPropsType } from '@marigold/system';

interface SVGProps extends SVGPropsType {
  className?: string;
}

export const ChevronRight = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <SVG className={className} {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M7.125 18.0244L13.1363 12L7.125 5.97563L8.97563 4.125L16.8506 12L8.97563 19.875L7.125 18.0244Z" />
    </SVG>
  )
);
