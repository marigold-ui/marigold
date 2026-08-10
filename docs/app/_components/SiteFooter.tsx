import { CONSENT_BANNER_ENABLED } from '@/lib/consent';
import Link from 'fumadocs-core/link';
import { ConsentSettingsButton } from './ConsentSettingsButton';

// No year, on purpose: `DocsPageFooter` puts this in the client graph, so
// `getFullYear()` would run at prerender and again at hydration — a text
// mismatch every January. It carries no legal weight.
export const SiteFooter = () => (
  <footer className="border-fd-border text-fd-muted-foreground mt-16 border-t py-6 text-xs">
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <span>© Reservix GmbH — Marigold Design System</span>
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
        {CONSENT_BANNER_ENABLED && <ConsentSettingsButton />}
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
