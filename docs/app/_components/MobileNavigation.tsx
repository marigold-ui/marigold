'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Dialog, Button, Headline } from '@/ui';
import {
  allContentPages,
  allComponentPages,
  ComponentPage,
} from '@/.contentlayer/generated';

// Helpers
// ---------------
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const renderContentPages = (pathname: string) => {
  const pages = [...allContentPages].sort(
    (a, b) => (a.order || 1000) - (b.order || 1000)
  );

  return pages.map(({ title, slugAsParams }) => (
    <Link href={`${pathname}${slugAsParams}`}>{title}</Link>
  ));
};

const renderComponentPages = (pathname: string) => {
  const pages: { [group in ComponentPage['group']]?: ComponentPage[] } = {};

  allComponentPages.forEach(page => {
    const group = pages[page.group] || [];
    return (pages[page.group] = [...group, page]);
  });

  return Object.entries(pages).map(([group, list]) => {
    return (
      <>
        <Headline level="2">{group}</Headline>
        {list.map(({ title, slugAsParams }) => (
          <Link
            className="text-secondary-700"
            href={`${pathname}${slugAsParams}`}
          >
            {title}
          </Link>
        ))}
      </>
    );
  });
};

// Component
// ---------------
export const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    <Dialog.Trigger>
      <Button>
        <MenuIcon />
      </Button>
      <Dialog variant="fullpage" closeButton>
        <div className="flex items-center text-3xl font-bold uppercase text-[#46505a]">
          <Image src="/logo.svg" alt="Marigold Logo" width={64} height={64} />
          Marigold Docs
        </div>
        <nav className="flex flex-col gap-6 pl-4 pt-8">
          <div className="flex flex-col gap-4">
            {renderContentPages(pathname)}
          </div>
          <div className="text-lg font-bold">Components</div>
          <div className="flex flex-col gap-4">
            {renderComponentPages(pathname)}
          </div>
        </nav>
      </Dialog>
    </Dialog.Trigger>
  );
};
