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
      {pages.children.map(({ $id: id, name }) => (
        <NavLink
          variant="main"
          className="text-sm font-medium lg:px-1"
          key={id}
          current={pathname.startsWith(`/${id.split(':')[1]}`)}
          href={`/${id.split(':')[1]}`}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
};
