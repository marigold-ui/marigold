'use client';

import { usePathname } from 'next/navigation';
import { NavLink } from '@/ui/navigation/NavLink';
import { useNavigation } from '@/ui/navigation/Navigation';

export const SiteNavigation = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const sections = navigation.map(section => ({
    name: section.name,
    slug: section.slug,
    link: section.links[0],
  }));

  return (
    <div className="flex items-center gap-4">
      {sections.map(({ name, slug, link }, index) => (
        <NavLink
          variant="main"
          className="text-sm font-medium lg:px-1"
          key={index}
          current={pathname.startsWith(`/${slug}`)}
          href={link?.href ?? `/${slug}`}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
};
