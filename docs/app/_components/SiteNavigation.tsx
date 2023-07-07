import Image from 'next/image';

export const SiteNavigation = () => (
  <div className="hidden w-full md:flex">
    <div className="flex items-center text-lg font-bold uppercase tracking-tight text-[#46505a]">
      <Image src="/logo.svg" alt="Marigold Logo" width={28} height={28} />
      Marigold
    </div>
  </div>
);
