import { Code, Play } from 'lucide-react';
import { LinkCard } from './LinkCard';

interface DemoLinksProps {
  /** URL to the live demo page */
  demo: string;
  /** URL to the source code (e.g. GitHub) */
  code: string;
}

export const DemoLinks = ({ demo, code }: DemoLinksProps) => (
  <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2">
    <LinkCard
      href={demo}
      title="View Demo"
      description="Open the interactive example"
      icon={<Play />}
    />
    <LinkCard
      href={code}
      title="View Code"
      description="Browse the source on GitHub"
      icon={<Code />}
    />
  </div>
);
