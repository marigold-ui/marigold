import { siteConfig } from '@/lib/config';
import { Logo } from '@/ui/Logo';

export const Footer = () => (
  <footer className="border-secondary-200 prose mt-36 flex flex-col items-center justify-between gap-8 border-t py-4 md:flex-row xl:max-w-[70ch]">
    <div className="flex items-center gap-[0.5ch] text-xs">
      Build with 🥵, 🧡 and <Logo className="size-3" />
    </div>
    <div className="text-xs">v{siteConfig.version}</div>
  </footer>
);
