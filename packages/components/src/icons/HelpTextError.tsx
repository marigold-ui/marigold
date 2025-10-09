import { forwardRef } from 'react';
import { SVG, SVGProps, cn } from '@marigold/system';

export const HelpTextError = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => (
    <SVG
      {...props}
      className={cn('h-4 w-4 shrink-0', className)}
      viewBox="0 0 24 24"
      role="presentation"
      ref={ref}
    >
      <path
        fill="currentColor"
        d="M2.25 20.3097H21.75L12 3.46875L2.25 20.3097ZM12.8864 17.2606H11.1136V15.4879H12.8864V17.2606ZM12.8864 13.7151H11.1136V10.1697H12.8864V13.7151Z"
      />
    </SVG>
  )
);
