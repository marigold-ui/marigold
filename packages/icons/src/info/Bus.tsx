import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Bus = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M3.79688 16.6184C3.79688 17.5216 4.19714 18.3324 4.82319 18.8968V20.7237C4.82319 21.2882 5.28503 21.75 5.84951 21.75H6.87582C7.4403 21.75 7.90214 21.2882 7.90214 20.7237V19.6974H16.1127V20.7237C16.1127 21.2882 16.5745 21.75 17.139 21.75H18.1653C18.7298 21.75 19.1916 21.2882 19.1916 20.7237V18.8968C19.8177 18.3324 20.2179 17.5216 20.2179 16.6184V6.35526C20.2179 2.76316 16.5437 2.25 12.0074 2.25C7.47109 2.25 3.79688 2.76316 3.79688 6.35526V16.6184ZM7.38899 17.6448C6.53715 17.6448 5.84952 16.9571 5.84952 16.1053C5.84952 15.2534 6.53715 14.5658 7.38899 14.5658C8.24083 14.5658 8.92846 15.2534 8.92846 16.1053C8.92846 16.9571 8.24083 17.6448 7.38899 17.6448ZM16.6258 17.6448C15.774 17.6448 15.0864 16.9571 15.0864 16.1053C15.0864 15.2534 15.774 14.5658 16.6258 14.5658C17.4777 14.5658 18.1653 15.2534 18.1653 16.1053C18.1653 16.9571 17.4777 17.6448 16.6258 17.6448ZM18.1653 11.4868H5.84952V6.35526H18.1653V11.4868Z" />
  </SVG>
));
