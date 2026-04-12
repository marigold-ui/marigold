import { Link } from 'fumadocs-core/framework';

interface DemoLinksProps {
  /** URL to the live demo page */
  demo: string;
  /** URL to the source code (e.g. GitHub) */
  code: string;
}

export const DemoLinks = ({ demo, code }: DemoLinksProps) => (
  <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2">
    <Link
      href={demo}
      className="group bg-fd-card text-fd-card-foreground hover:bg-fd-accent/80 flex items-center gap-5 rounded-xl border px-5 py-4 shadow-md transition-colors"
    >
      <span className="bg-fd-muted text-fd-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg border shadow-md transition-transform group-hover:scale-110">
        <PlayIcon />
      </span>
      <span>
        <span className="text-fd-card-foreground block text-sm font-medium">
          View Demo
        </span>
        <span className="text-fd-muted-foreground block text-sm">
          Open the interactive example
        </span>
      </span>
      <span className="text-fd-muted-foreground ml-auto opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
        <ArrowIcon />
      </span>
    </Link>
    <Link
      href={code}
      className="group bg-fd-card text-fd-card-foreground hover:bg-fd-accent/80 flex items-center gap-5 rounded-xl border px-5 py-4 shadow-md transition-colors"
    >
      <span className="bg-fd-muted text-fd-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg border shadow-md transition-transform group-hover:scale-110">
        <CodeIcon />
      </span>
      <span>
        <span className="text-fd-card-foreground block text-sm font-medium">
          View Code
        </span>
        <span className="text-fd-muted-foreground block text-sm">
          Browse the source on GitHub
        </span>
      </span>
      <span className="text-fd-muted-foreground ml-auto opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
        <ArrowIcon />
      </span>
    </Link>
  </div>
);

const PlayIcon = () => (
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
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const CodeIcon = () => (
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
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

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
