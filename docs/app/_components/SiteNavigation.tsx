'use client';

import { Inline, Link } from '@/ui';

import { usePathname } from 'next/navigation';

import { CommandMenu } from '@/ui/Commandk';

import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { useNavigation } from './Navigation';
import { ThemeMenu } from './ThemeMenu';

export const SiteNavigation = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const sections = navigation.map(section => ({
    name: section.name,
    slug: section.slug,
    link:
      section.subsections.length > 0
        ? section.subsections[0].links[0]
        : section.links[0],
  }));

  return (
    <div className="flex items-center gap-4">
      {sections.map(({ name, slug, link }, index) => (
        <NavLink
          variant="main"
          className="text-sm font-medium lg:px-1"
          key={index}
          current={pathname.includes(slug)}
          href={link?.href ?? '/'}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
};
