import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ResaleEdit = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M20.7958 17.6789C20.9751 17.7813 21.0584 17.9543 21.0456 18.1977C21.0328 18.4411 20.9239 18.6524 20.7189 18.8318L18.8358 20.7149C18.4515 21.0992 18.0672 21.0992 17.6829 20.7149L10.2274 13.2594C9.30511 13.6437 8.32515 13.7269 7.28752 13.5092C6.2499 13.2914 5.34679 12.7982 4.57818 12.0296C3.75833 11.2097 3.24593 10.2362 3.04097 9.10889C2.836 7.9816 2.98972 6.93118 3.50213 5.9576L7.11459 9.4932L9.57413 7.03365L6.03854 3.49806C7.01211 3.03689 8.06253 2.89598 9.18983 3.07532C10.3171 3.25467 11.2907 3.75426 12.1105 4.57411C12.8791 5.34272 13.3723 6.24582 13.5901 7.28345C13.8079 8.32107 13.7246 9.30104 13.3403 10.2234L20.7958 17.6789Z" />
  </SVG>
));
