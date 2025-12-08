'use client';

import { usePathname } from 'next/navigation';
import { NavLink } from '../navigation/NavLink';

interface SectionNavigationProps {
  pages: any;
}

export const SectionNavigation = ({ pages }: SectionNavigationProps) => {
  const pathname = usePathname();
  const currentPathSegment = pathname.split('/').find(Boolean);

  const currentSection = pages.children.find(
    (page: any) => page.$id.split(':')[1] === currentPathSegment
  );

  if (!currentSection) return null;

  /** ----------------------------------------------------
   *  Utils
   * ---------------------------------------------------- */

  // Collect all leaf page nodes from a folder
  const getLeafPages = (node: any): any[] => {
    if (node.type === 'page') return node.url ? [node] : [];

    if (node.type === 'folder') {
      const leaf: any[] = [];

      if (node.index?.url) leaf.push(node.index);

      (node.children || []).forEach((child: any) => {
        leaf.push(...getLeafPages(child));
      });

      return leaf;
    }

    return [];
  };

  // Create a NavLink
  const createLink = (item: any, url: string, key?: string) => (
    <NavLink
      className="flex items-center gap-4"
      key={key || item.$id}
      current={pathname === url}
      href={url}
    >
      {item.name}
    </NavLink>
  );

  const renderItem = (item: any) => {
    if (item.type === 'page' && item.url) {
      return createLink(item, item.url);
    }

    if (item.type === 'folder') {
      const leaves = getLeafPages(item);

      // Folder with a single leaf → direct link
      if (leaves.length === 1) {
        const page = leaves[0];
        return createLink(page, page.url, item.$id);
      }

      // Folder with multiple children → create link for each child
      return (item.children || [])
        .map((child: any) => {
          const url = child.index?.url || child.url || child.children?.[0]?.url;

          return url ? createLink(child, url) : null;
        })
        .filter(Boolean);
    }

    return null;
  };

  const renderSections = () => {
    const sections: React.ReactNode[] = [];
    let group: any[] = [];
    let separator: any = null;

    const pushGroup = (key: string) => {
      if (group.length === 0) return;

      sections.push(
        <div key={key}>
          {separator && (
            <p className="text-secondary-600 py-1 text-sm font-semibold">
              {separator.name}
            </p>
          )}
          <div className="border-secondary-300 ml-0.5 flex flex-col border-l">
            {group}
          </div>
        </div>
      );
    };

    currentSection.children.forEach((item: any, i: number) => {
      if (item.type === 'separator') {
        pushGroup(`section-${separator?.$id || i}`);
        separator = item;
        group = [];
      } else {
        const rendered = renderItem(item);
        if (Array.isArray(rendered)) group.push(...rendered);
        else if (rendered) group.push(rendered);
      }
    });

    pushGroup('section-last');
    return sections;
  };

  /** ----------------------------------------------------
   *  Return
   * ---------------------------------------------------- */

  return (
    <nav className="flex flex-col gap-2">
      <p className="font-semibold">{currentSection.name}</p>
      {renderSections()}
    </nav>
  );
};
