'use client';

import { usePathname } from 'next/navigation';

import { allContentPages } from 'contentlayer/generated';

import { siteConfig } from '@/lib/config';
import { NavLink } from './NavLink';

// Types
// ---------------

interface NavigationLink {
  href: string;
  name: string;
}

interface NavigationSubsection {
  name: string;
  links: NavigationLink[];
}
interface NavigationSection {
  name: string;
  links: NavigationLink[];
  subsections: NavigationSubsection[];
}

const useNavigation = (): NavigationSection[] => {
  const navigation = siteConfig.navigation;

  return navigation.map(({ name, slug, subsections = [] }) => {
    // Section Page = has a section but NO subsection
    const sectionPages = allContentPages.filter(
      page => page.section === slug && !page.subsection
    );

    return {
      name,
      links: sectionPages.map(page => ({
        name: page.title,
        href: `/${page.slug}`,
      })),
      subsections: subsections.map(subsection => ({
        name: subsection.name,
        links: allContentPages
          .filter(
            // Subsection Page = has a section AND a subsection
            page => page.section === slug && page.subsection === subsection.slug
          )
          .map(page => ({
            name: page.title,
            href: `/${page.slug}`,
          })),
      })),
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
    <nav className="flex flex-col gap-10 pl-4 pr-11 pt-8">
      {navigation.map(section => (
        <div key={section.name} className="flex flex-col gap-2">
          <div className="font-semibold">{section.name}</div>
          <div className="border-secondary-300 ml-0.5 flex flex-col gap-2 border-l">
            {section.links.map(({ name, href }) => (
              <NavLink
                key={href}
                current={pathname === href}
                href={href}
                onClick={onClick}
              >
                {name}
              </NavLink>
            ))}
          </div>
          {section.subsections &&
            section.subsections.map(({ name, links }) => (
              <div key={name} className="flex flex-col gap-2.5 pb-4">
                <div className="text-secondary-600 text-sm font-semibold">
                  {name}
                </div>
                <div className="border-secondary-300 ml-0.5 flex flex-col gap-2 border-l">
                  {links.map(({ name, href }) => (
                    <NavLink
                      key={href}
                      current={pathname === href}
                      href={href}
                      onClick={onClick}
                    >
                      {name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </nav>
  );
};
