'use client';

import { usePathname } from 'next/navigation';
import { NavLink } from './NavLink';
import { useNavigation } from './Navigation';

export const SiteNavigation = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const sections = navigation.map(section => ({
    name: section.name,
    slug: section.slug,
    link: section.slug.includes('changelog')
      ? section.subsections.filter(item => item.links?.map(val => val.href))
      : section.links[0],
  }));

  return (
    <div className="flex items-center gap-4">
      {sections.map(
        ({ name, slug, link }, index) =>
          console.log(name) || (
            <NavLink
              variant="main"
              className="text-sm font-medium lg:px-1"
              key={index}
              current={pathname.includes(slug)}
              href={link?.href ?? '/'}
            >
              {name}
            </NavLink>
          )
      )}
    </div>
  );
};
