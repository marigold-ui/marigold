'use client';
import { usePathname } from 'next/navigation';
import { NavLink } from '@/ui/navigation/NavLink';

interface PageData {
  slug: string;
  title: string;
}

interface SiteNavigationProps {
  pages: PageData[];
}

export const SiteNavigation = ({ pages }: SiteNavigationProps) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {pages.map(({ slug, title }, index) => (
        <NavLink
          variant="main"
          className="text-sm font-medium lg:px-1"
          key={index}
          current={pathname.startsWith(`/${slug}`)}
          href={`/${slug}`}
        >
          {title}
        </NavLink>
      ))}
    </div>
  );
};
