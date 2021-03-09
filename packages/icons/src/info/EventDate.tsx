import React from 'react';
import { SVG } from '../SVG';

export const EventDate = ({ className = '', ...props }) => (
  <SVG className={className} {...props}>
    <path d="M16.5566 11.9766H11.9766V16.5566H16.5566V11.9766ZM15.6406 1.90039V3.73242H8.3125V1.90039H6.48047V3.73242H5.56445C4.54768 3.73242 3.74158 4.55684 3.74158 5.56445L3.73242 18.3887C3.73242 19.3963 4.54768 20.2207 5.56445 20.2207H18.3887C19.3963 20.2207 20.2207 19.3963 20.2207 18.3887V5.56445C20.2207 4.55684 19.3963 3.73242 18.3887 3.73242H17.4727V1.90039H15.6406ZM18.3887 18.3887H5.56445V8.3125H18.3887V18.3887Z" />
  </SVG>
);
