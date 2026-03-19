import { AppLayout, Sidebar, TopNavigation } from '@marigold/components';

export default () => (
  <div className="h-[300px] [&>div]:!h-full">
    <Sidebar.Provider defaultOpen>
      <AppLayout>
        <AppLayout.Sidebar>
          <Sidebar.Header>
            <span className="text-sm font-medium">Logo</span>
          </Sidebar.Header>
          <Sidebar.Nav>
            <Sidebar.Item href="#">Navigation 1</Sidebar.Item>
            <Sidebar.Item href="#">Navigation 2</Sidebar.Item>
            <Sidebar.Item href="#">Navigation 3</Sidebar.Item>
          </Sidebar.Nav>
        </AppLayout.Sidebar>
        <AppLayout.Header>
          <TopNavigation.Start>
            <Sidebar.Toggle />
          </TopNavigation.Start>
          <TopNavigation.Middle>
            <span className="text-sm">Breadcrumbs</span>
          </TopNavigation.Middle>
          <TopNavigation.End>
            <span className="text-sm">User Menu</span>
          </TopNavigation.End>
        </AppLayout.Header>
        <AppLayout.Main>
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="rounded-sm bg-stone-50 p-3 text-sm">
                Content item {i + 1}
              </div>
            ))}
          </div>
        </AppLayout.Main>
      </AppLayout>
    </Sidebar.Provider>
  </div>
);
