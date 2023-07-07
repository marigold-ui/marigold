'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Dialog, Button } from '@/ui';
import {
  allContentPages,
  allComponentPages,
  ComponentPage,
} from '@/.contentlayer/generated';
import { siteConfig } from '@/lib/config';

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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const renderContentPages = () => {
  const pages = [...allContentPages].sort(
    (a, b) => (a.order || 1000) - (b.order || 1000)
  );
  console.log(pages);
  return pages.map(({ title, slug }) => (
    <Link key={slug} href={slug}>
      {title}
    </Link>
  ));
};

const renderComponentPages = () => {
  const groups = siteConfig.navigation.componentGroups;
  const pages: { [group in ComponentPage['group']]?: ComponentPage[] } = {};

  allComponentPages.forEach(page => {
    const group = pages[page.group] || [];
    return (pages[page.group] = [...group, page]);
  });

  const list = Object.entries(pages);
  list.sort(([a], [b]) => groups.indexOf(a) - groups.indexOf(b));
  console.log(pages);
  return list.map(([group, list]) => (
    <div key={group} className="flex flex-col gap-2">
      <div className="text-secondary-700 font-semibold">{group}</div>
      <div className="border-secondary-300 ml-0.5 border-l">
        {list.map(({ title, slug }) => (
          <Link
            key={slug}
            className="text-secondary-500 block py-1.5 pl-4 text-sm"
            href={slug}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  ));
};

// Component
// ---------------
export const MobileNavigation = () => {
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
        <nav className="flex flex-col gap-10 pl-4 pt-8">
          <div className="flex flex-col gap-4">{renderContentPages()}</div>

          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold">Components</div>
            {renderComponentPages()}
          </div>
        </nav>
      </Dialog>
    </Dialog.Trigger>
  );
};
