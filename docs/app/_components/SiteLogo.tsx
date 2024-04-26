import Link from 'next/link';

import { Logo } from './Logo';

export const SiteLogo = () => (
  <Link className="flex items-center gap-1.5" href="/">
    <Logo className="size-6" />
    <div className="hidden text-lg font-bold uppercase text-[#46505a] lg:block">
      Marigold
    </div>
  </Link>
);
