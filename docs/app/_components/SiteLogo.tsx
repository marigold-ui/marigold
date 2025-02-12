import Link from 'next/link';
import { Logo } from '@/ui/Logo';

export const SiteLogo = () => (
  <Link
    className="flex items-center gap-1.5 xl:w-(--page-sub-nav-absolute-width)"
    href="/"
  >
    <Logo className="size-6" />
    <div className="hidden text-lg font-bold text-[#46505a] uppercase lg:block">
      Marigold
    </div>
  </Link>
);
