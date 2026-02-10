import { SidebarFolder } from '@/app/_components/SidebarFolder';
import { SidebarSeparator } from '@/app/_components/SidebarSeparator';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

const Layout = ({ children }: LayoutProps<'/'>) => {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        components: {
          Separator: SidebarSeparator,
          Folder: SidebarFolder,
        },
      }}
    >
      {children}
    </DocsLayout>
  );
};

export default Layout;
