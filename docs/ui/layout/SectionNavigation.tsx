'use client';

import { usePathname } from 'next/navigation';
import { Badge } from '@marigold/components';
import { NavLink } from '@/ui/navigation/NavLink';
import { useNavigation } from '@/ui/navigation/Navigation';

export const SectionNavigation = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const slug = pathname.split('/')[1].toLocaleLowerCase();
  const formattedSectionName = slug.includes('-')
    ? slug.split('-').join(' ')
    : slug;
  const currentSection = navigation.find(
    section => section.name.toLocaleLowerCase() === formattedSectionName
  );

  return (
    <nav className="flex flex-col gap-2">
      <p className="font-semibold">{currentSection?.name}</p>
      <div className="border-secondary-300 ml-0.5 flex flex-col border-l">
        {currentSection?.links.map(({ name, href, badge }) => (
          <NavLink
            className="flex items-center gap-4"
            key={href}
            current={pathname === href}
            href={href}
          >
            {name}
            {badge && <Badge variant="dark">{badge}</Badge>}
          </NavLink>
        ))}
      </div>
      {currentSection?.subsections &&
        currentSection.subsections.map(({ name, links }) => (
          <div key={name} className="flex flex-col gap-2.5 pb-4">
            <p className="text-secondary-600 text-sm font-semibold">{name}</p>
            <div className="border-secondary-300 ml-0.5 flex flex-col border-l">
              {links?.map(({ name, href, badge }) => (
                <div key={href}>
                  <NavLink
                    className="flex items-center gap-4"
                    current={pathname === href}
                    href={href}
                  >
                    {name}
                    {badge && <Badge variant="dark">{badge}</Badge>}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        ))}
    </nav>
  );
};
