import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Share = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M15.3481 16.0505L9.44221 12.613C9.48362 12.4224 9.51675 12.2319 9.51675 12.0331C9.51675 11.8343 9.48362 11.6438 9.44221 11.4533L15.2818 8.04895C15.7291 8.4631 16.3172 8.71988 16.9716 8.71988C18.3466 8.71988 19.4565 7.60994 19.4565 6.23494C19.4565 4.85994 18.3466 3.75 16.9716 3.75C15.5966 3.75 14.4866 4.85994 14.4866 6.23494C14.4866 6.43373 14.5198 6.62425 14.5612 6.81476L8.72157 10.2191C8.27428 9.80497 7.68618 9.54819 7.03181 9.54819C5.65681 9.54819 4.54687 10.6581 4.54687 12.0331C4.54687 13.4081 5.65681 14.5181 7.03181 14.5181C7.68618 14.5181 8.27428 14.2613 8.72157 13.8471L14.6192 17.2929C14.5777 17.4669 14.5529 17.6491 14.5529 17.8313C14.5529 19.1649 15.638 20.25 16.9716 20.25C18.3052 20.25 19.3902 19.1649 19.3902 17.8313C19.3902 16.4977 18.3052 15.4127 16.9716 15.4127C16.3421 15.4127 15.7788 15.6611 15.3481 16.0505Z" />
  </SVG>
));
