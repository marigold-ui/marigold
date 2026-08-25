import { ExternalLink } from '../icons/ExternalLink';

/** Decorative new-tab marker. `NewTabLabel` carries the announcement. */
export const NewTabIcon = ({
  active,
  className,
}: {
  active?: boolean;
  className?: string;
}) =>
  active ? <ExternalLink size={16} aria-hidden className={className} /> : null;
