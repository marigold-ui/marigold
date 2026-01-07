'use client';

import { Link, LinkProps } from '@marigold/components';

export default (props: LinkProps) => (
  <div className="grid place-items-center">
    <Link href="https://www.reservix.net/karriere/" {...props}>
      Find your dream job at Reservix
    </Link>
  </div>
);
