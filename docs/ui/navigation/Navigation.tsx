'use client';

import { siteConfig } from '@/lib/config';
import { Badge } from '@/ui';
import { ContentPage, allContentPages } from 'contentlayer/generated';
import { usePathname } from 'next/navigation';
import { NavLink } from './NavLink';

// Types
// ---------------

interface NavigationLink {
  href: string;
  name: string;
  badge?: string;
}

interface NavigationSubsection {
  name: string;
  links?: NavigationLink[];
}
interface NavigationSection {
  name: string;
  slug: string;
  links: NavigationLink[];
  subsections: NavigationSubsection[];
}

export const useNavigation = (): NavigationSection[] => {
  const navigation = [...siteConfig.navigation] as NavigationSection[];
  return navigation.map(({ name, slug, subsections = [] }) => {
    // Section Page = has a section but NO subsection
    const sectionPages = allContentPages
      .filter((page: ContentPage) => page.section === slug && !page.subsection)
      .sort((a, b) => (a.order || 1000) - (b.order || 1000));

    return {
      name,
      slug,
      links: sectionPages.map((page: ContentPage) => ({
        name: page.title,
        href: `/${page.slug}`,
        badge: page.badge,
      })),
      subsections: subsections.map(
        (subsection: { name: string; slug: string }) => ({
          name: subsection.name,
          links: [
            ...allContentPages
              .filter(
                // Subsection Page = has a section AND a subsection
                (page: ContentPage) =>
                  page.section === slug && page.subsection === subsection.slug
              )
              .map((page: ContentPage) => ({
                name: page.title,
                href: `/${page.slug}`,
                badge: page.badge,
              })),
          ],
        })
      ),
    };
  });
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
  const navigation = useNavigation();

  return (
    <nav className="mb-12 flex flex-col gap-10 pt-8 pr-11 pl-4">
      {navigation.map(section => (
        <div key={section.name} className="flex flex-col gap-2">
          <div className="font-semibold">{section.name}</div>
          <div className="border-secondary-300 ml-0.5 flex flex-col border-l">
            {section.links.map(({ name, href, badge }) => (
              <NavLink
                className="flex items-center gap-4"
                key={href}
                current={pathname === href}
                href={href}
                onClick={onClick}
              >
                {name}
                {badge && <Badge variant="dark">{badge}</Badge>}
              </NavLink>
            ))}
          </div>
          {section.subsections &&
            section.subsections.map(({ name, links }) => (
              <div key={name} className="flex flex-col gap-2.5 pb-4">
                <div className="text-secondary-600 text-sm font-semibold">
                  {name}
                </div>
                <div className="border-secondary-300 ml-0.5 flex flex-col border-l">
                  {links?.map(({ name, href, badge }) => (
                    <div key={href}>
                      <NavLink
                        className="flex items-center gap-4"
                        current={pathname === href}
                        href={href}
                        onClick={onClick}
                      >
                        {name}
                        {badge && <Badge variant="dark">{badge}</Badge>}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </nav>
  );
};
