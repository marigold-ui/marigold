import { Logo } from '@/ui/Logo';

const version = process.env.version;

export const SiteLogo = () => (
  <>
    <Logo className="size-6" />
    <div className="hidden text-lg font-bold text-[#46505a] uppercase lg:block dark:text-white">
      Marigold
    </div>
    <span className="block text-xs text-stone-400 dark:text-neutral-500">
      v{version}
    </span>
  </>
);
