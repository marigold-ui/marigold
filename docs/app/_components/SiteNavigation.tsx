import { Link, Text } from '@/ui';

import { Logo } from './Logo';
import { ThemeMenu } from './ThemeMenu';

export const SiteNavigation = () => (
  <div className="hidden w-full justify-between gap-3 md:flex">
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold uppercase tracking-tight text-[#46505a] no-underline"
    >
      <Logo className="h-6 w-6" />
      Marigold
    </Link>
    <div className="bg-bg-muted rounded p-2">
      <Link
        href="https://marigold-ui.github.io/marigold/"
        className="no-underline"
        target="_blank"
      >
        <Text fontSize="sm">Visit old Docs (v5.6.0)</Text>
      </Link>
    </div>
    <ThemeMenu />
  </div>
);
