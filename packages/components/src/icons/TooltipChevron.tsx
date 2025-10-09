import { forwardRef } from 'react';
import { SVG, SVGProps, cn } from '@marigold/system';

export const TooltipChevron = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    //   SVG component from @marigold/system has fill-current as a default class. We have to overwrite it sometimes when it's not set
    <SVG
      width={8}
      height={8}
      viewBox="0 0 8 8"
      ref={ref}
      className={cn(props.className, 'fill-inherit')}
      {...props}
    >
      <path d="M0 0 L4 4 L8 0" />
    </SVG>
  )
);
