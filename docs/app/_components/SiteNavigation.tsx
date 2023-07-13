import { Logo } from './Logo';

export const SiteNavigation = () => (
  <div className="hidden w-full md:flex">
    <div className="flex items-center gap-2 text-lg font-bold uppercase tracking-tight text-[#46505a]">
      <Logo className="h-6 w-6" />
      Marigold
    </div>
  </div>
);
