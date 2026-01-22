import Link from 'next/link';
import { Logo } from '@/ui/Logo';

export const SiteLogo = () => (
  <>
    <Logo className="size-6" />
    <div className="hidden text-lg font-bold text-[#46505a] uppercase lg:block">
      Marigold
    </div>
  </>
);
