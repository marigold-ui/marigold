import { SidebarFolder } from '@/app/_components/SidebarFolder';
import { SidebarSeparator } from '@/app/_components/SidebarSeparator';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

const Layout = ({ children }: LayoutProps<'/'>) => {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      // We need the nav only
      nav={baseOptions().nav}
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
