import { forwardRef } from 'react';
import { SVG, SVGProps as SVGPropsType } from '@marigold/system';

interface SVGProps extends SVGPropsType {
  className?: string;
}

export const ChevronUp = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <SVG className={className} {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M5.97563 16.8506L12 10.8394L18.0244 16.8506L19.875 15L12 7.125L4.125 15L5.97563 16.8506Z" />
    </SVG>
  )
);
