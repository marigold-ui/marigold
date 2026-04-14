import { Logo } from '@/ui/Logo';
import componentsPkg from '../../../packages/components/package.json';

export const SiteLogo = () => (
  <>
    <Logo className="size-6" />
    <div className="hidden text-lg font-bold text-[#46505a] uppercase lg:block dark:text-white">
      Marigold
    </div>
    <span className="hidden text-xs text-stone-400 lg:block dark:text-neutral-500">
      v{componentsPkg.version}
    </span>
  </>
);
