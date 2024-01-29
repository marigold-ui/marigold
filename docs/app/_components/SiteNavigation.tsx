'use client';

import { Link } from '@/ui';

import { usePathname } from 'next/navigation';

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
    <div className="hidden w-full justify-between gap-3 md:flex ">
      <div className="flex">
        <div className="flex w-64 shrink-0 items-center text-lg uppercase text-[#46505a] xl:w-[287px] [&>*]:flex [&>*]:items-center [&>*]:gap-2 [&>*]:font-bold [&>*]:no-underline">
          <Link href="/">
            <Logo className="size-6" />
            Marigold
          </Link>
        </div>
        <div className="hidden gap-4 md:flex">
          {sections.map(({ name, slug, link }, index) => (
            <NavLink
              variant="main"
              className="flex items-center gap-6 px-1 text-sm font-medium"
              key={index}
              current={pathname.includes(slug)}
              href={link?.href ?? '/'}
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
      <ThemeMenu />
    </div>
  );
};
