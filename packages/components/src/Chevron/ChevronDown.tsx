import { forwardRef } from 'react';
import { SVG, SVGProps as SVGPropsType } from '@marigold/system';

interface SVGProps extends SVGPropsType {
  className?: string;
}

export const ChevronDown = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <SVG className={className} {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M5.97563 7.125L12 13.1363L18.0244 7.125L19.875 8.97563L12 16.8506L4.125 8.97563L5.97563 7.125Z" />
    </SVG>
  )
);
