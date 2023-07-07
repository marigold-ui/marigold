'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Dialog, Button, Header, cn } from '@/ui';
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

const renderContentPages = ({ close }: { close?: () => void }) => {
  const pages = [...allContentPages].sort(
    (a, b) => (a.order || 1000) - (b.order || 1000)
  );

  return pages.map(({ title, slug }) => (
    <Link key={slug} href={slug} onClick={close}>
      {title}
    </Link>
  ));
};

const renderComponentPages = ({ close }: { close?: () => void }) => {
  const groups = siteConfig.navigation.componentGroups;
  const pages: { [group in ComponentPage['group']]?: ComponentPage[] } = {};

  allComponentPages.forEach(page => {
    const group = pages[page.group] || [];
    return (pages[page.group] = [...group, page]);
  });

  const list = Object.entries(pages);
  list.sort(([a], [b]) => groups.indexOf(a) - groups.indexOf(b));

  return list.map(([group, list]) => (
    <div key={group} className="flex flex-col gap-2">
      <div className="text-secondary-700 font-semibold">{group}</div>
      <div className="border-secondary-300 ml-0.5 border-l">
        {list.map(({ title, slug }) => (
          <Link
            key={slug}
            className={cn(
              'text-secondary-500 block py-1.5 pl-4 text-sm',
              'hover:border-primary-500 hover:text-secondary-800 -ml-px border-l border-transparent'
            )}
            href={slug}
            onClick={close}
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
export const MobileNavigation = () => (
  <Dialog.Trigger>
    <Button className="md:hidden">
      <MenuIcon />
    </Button>
    <Dialog variant="fullpage" closeButton>
      {({ close }) => (
        <>
          <Header className="flex items-center text-3xl font-bold uppercase tracking-tight text-[#46505a]">
            <Image src="/logo.svg" alt="Marigold Logo" width={64} height={64} />
            Marigold
          </Header>
          <nav className="flex flex-col gap-10 pl-4 pt-8">
            <div className="flex flex-col gap-4">
              {renderContentPages({ close })}
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-lg font-bold">Components</div>
              {renderComponentPages({ close })}
            </div>
          </nav>
        </>
      )}
    </Dialog>
  </Dialog.Trigger>
);
