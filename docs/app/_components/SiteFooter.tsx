import Link from 'fumadocs-core/link';
import { ConsentSettingsButton } from './ConsentSettingsButton';

const YEAR = new Date().getFullYear();

export const SiteFooter = () => (
  <footer className="border-fd-border text-fd-muted-foreground mt-16 border-t py-6 text-xs">
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <span>© {YEAR} Reservix GmbH — Marigold Design System</span>
      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link
          className="hover:text-fd-foreground transition-colors"
          href="/impressum"
        >
          Impressum
        </Link>
        <Link
          className="hover:text-fd-foreground transition-colors"
          href="/datenschutz"
        >
          Datenschutz
        </Link>
        <ConsentSettingsButton />
        <Link
          className="hover:text-fd-foreground transition-colors"
          href="https://github.com/marigold-ui/marigold"
        >
          GitHub
        </Link>
      </nav>
    </div>
  </footer>
);
