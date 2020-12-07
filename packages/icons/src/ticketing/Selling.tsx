import React from 'react';
import { Svg } from '@marigold/components';

export const Selling = ({ className = '', ...props }) => (
  <Svg className={className} {...props}>
    <path d="M20.469 11.622L12.369 3.522C12.045 3.198 11.595 3 11.1 3H4.8C3.81 3 3 3.81 3 4.8V11.1C3 11.595 3.198 12.045 3.531 12.378L11.631 20.478C11.955 20.802 12.405 21 12.9 21C13.395 21 13.845 20.802 14.169 20.469L20.469 14.169C20.802 13.845 21 13.395 21 12.9C21 12.405 20.793 11.946 20.469 11.622ZM6.14998 7.50003C5.40298 7.50003 4.79998 6.89703 4.79998 6.15003C4.79998 5.40303 5.40298 4.80003 6.14998 4.80003C6.89698 4.80003 7.49998 5.40303 7.49998 6.15003C7.49998 6.89703 6.89698 7.50003 6.14998 7.50003Z" />
  </Svg>
);
