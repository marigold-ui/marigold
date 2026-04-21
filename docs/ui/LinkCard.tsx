import { Link } from 'fumadocs-core/framework';
import type { ReactNode } from 'react';

interface LinkCardProps {
  /** Where the card links to. External URLs (http/https) open in a new tab. */
  href: string;
  /** Primary text */
  title: ReactNode;
  /** Secondary description rendered below the title */
  description?: ReactNode;
  /** Icon rendered in the leading chip (e.g. a Lucide icon) */
  icon?: ReactNode;
}

export const LinkCard = ({ href, title, description, icon }: LinkCardProps) => {
  const external = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="not-prose group border-fd-info/40 from-fd-info/30 via-fd-info/15 to-fd-info/8 hover:border-fd-info/60 dark:border-fd-info/35 dark:from-fd-info/15 dark:via-fd-info/8 dark:to-fd-info/3 dark:hover:border-fd-info/50 relative flex items-center gap-5 overflow-hidden rounded-xl border bg-gradient-to-br px-5 py-4 shadow-sm transition-all hover:shadow-md"
    >
      {icon && (
        <span className="border-fd-info/35 bg-fd-info/15 text-fd-info dark:border-fd-info/25 dark:bg-fd-info/15 flex size-10 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-transform group-hover:scale-110 [&_svg]:size-5">
          {icon}
        </span>
      )}
      <span>
        <span className="text-fd-foreground block text-sm font-medium">
          {title}
        </span>
        {description && (
          <span className="text-fd-muted-foreground block text-sm">
            {description}
          </span>
        )}
      </span>
      <span className="text-fd-info ml-auto opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
        <ArrowIcon />
      </span>
    </Link>
  );
};

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
