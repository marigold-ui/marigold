'use client';

import { Link } from 'fumadocs-core/framework';
import { Card } from 'fumadocs-ui/components/card';
import { ExternalLink } from './icons/ExternalLink';

export const StorybookHintMessage = ({ component }: { component: string }) => {
  const href = `https://marigold-latest.vercel.app/?path=/story/components-${component.toLowerCase()}--basic`;

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'storybook_visit', { component });
    }
  };

  return (
    <Card title="">
      <div className="flex gap-4">
        <div className="flex h-full shrink-0 items-center">
          <StorybookIcon />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm">
            Did you know? You can explore, test, and customize props live in
            Marigold&apos;s storybook. Watch the effects they have in real-time!
          </div>
          <div className="text-sm">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="text-fd-primary inline-flex items-center gap-0.5 hover:underline"
            >
              View {component} stories
              <ExternalLink className="text-text-primary-muted ml-0.5 inline size-[14px] align-text-bottom" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

const StorybookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid"
    viewBox="0 0 256 319"
    className="size-14"
  >
    <defs>
      <path
        id="a"
        d="M9.87 293.32L.01 30.57a16 16 0 0115-16.57L238.49.03a16 16 0 0117 15.97v286.32a16 16 0 01-16.72 15.99l-213.62-9.6a16 16 0 01-15.28-15.39z"
      />
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
    </defs>
    <use xlinkHref="#a" fill="#ff4785" />
    <path
      fill="#fff"
      d="M188.67 39.13l1.52-36.72L220.9 0l1.32 37.86a2.39 2.39 0 01-3.87 1.96l-11.83-9.32-14.02 10.63a2.39 2.39 0 01-3.82-2zm-39.26 80.85c0 6.23 41.95 3.24 47.58-1.13 0-42.4-22.76-64.68-64.42-64.68s-65 22.62-65 56.57c0 59.11 79.78 60.24 79.78 92.49 0 9.05-4.44 14.42-14.19 14.42-12.7 0-17.73-6.48-17.14-28.55 0-4.78-48.45-6.28-49.93 0-3.76 53.47 29.55 68.9 67.66 68.9 36.94 0 65.9-19.69 65.9-55.33 0-63.36-80.97-61.66-80.97-93.06 0-12.72 9.46-14.42 15.07-14.42 5.91 0 16.55 1.04 15.66 24.8z"
      mask="url(#b)"
    />
  </svg>
);
