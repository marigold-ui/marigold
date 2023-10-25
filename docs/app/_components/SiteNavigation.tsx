import { Link, Text } from '@/ui';

import { Logo } from './Logo';
import { ThemeMenu } from './ThemeMenu';

export const SiteNavigation = () => (
  <div className="hidden w-full justify-between gap-3 md:flex">
    <div className="flex  items-center text-lg uppercase tracking-tight text-[#46505a] [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:font-bold [&>*]:no-underline">
      <Link href="/">
        <Logo className="h-6 w-6" />
        Marigold
      </Link>
    </div>
    <div className="bg-bg-muted rounded p-2 [&>*]:no-underline">
      <Link href="https://marigold-ui.github.io/marigold/" target="_blank">
        <Text fontSize="sm">Visit old Docs (v5.6.0)</Text>
      </Link>
    </div>
    <ThemeMenu />
  </div>
);
