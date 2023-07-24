'use client';

import { usePathname } from 'next/navigation';

import {
  allContentPages,
  ComponentPage,
  allComponentPages,
} from 'contentlayer/generated';

import { siteConfig } from '@/lib/config';
import { NavLink } from './NavLink';

// Render Sections
// ---------------
export interface RenderProps {
  onClick?: () => void;
  current: string;
}

export const renderContentPages = ({ onClick, current }: RenderProps) => {
  const pages = [...allContentPages].sort(
    (a, b) => (a.order || 1000) - (b.order || 1000)
  );

  return pages.map(({ title, slug }) => (
    <NavLink
      key={slug}
      variant="main"
      current={current === slug}
      href={slug}
      onClick={onClick}
    >
      {title}
    </NavLink>
  ));
};

export const renderComponentPages = ({ onClick, current }: RenderProps) => {
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
      <div className="text-secondary-700 text-sm font-semibold">{group}</div>
      <div className="border-secondary-300 ml-0.5 flex flex-col gap-2 border-l">
        {list.map(({ title, slug }) => (
          <NavLink
            key={slug}
            current={current === slug}
            href={slug}
            onClick={onClick}
          >
            {title}
          </NavLink>
        ))}
      </div>
    </div>
  ));
};

// Props
// ---------------
export interface NavigationProps {
  onClick?: () => void;
}

// Compponent
// ---------------
export const Navigation = ({ onClick }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-8 right-0 flex h-[calc(100vh-90px)] flex-col gap-8 overflow-y-auto pt-8">
      <div className="flex flex-col gap-4">
        {renderContentPages({ onClick, current: pathname })}
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-semibold">Components</div>
        {renderComponentPages({ onClick, current: pathname })}
      </div>
    </nav>
  );
};
