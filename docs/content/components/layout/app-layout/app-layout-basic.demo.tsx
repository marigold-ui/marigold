import { AppLayout, Sidebar, TopNavigation } from '@marigold/components';

// The preview cage (`h-[400px]`) stands in for the browser viewport so the
// page-scroll semantics play out inside the docs page:
// - `overflow-y-auto overscroll-contain` makes the cage its own scroll root
//   (and stops scroll chaining into the docs page).
// - `[&>div]:!min-h-0` neutralises `AppLayout`'s `min-h-dvh` so the grid is
//   sized by its content, not the real viewport.
// - `[&_aside]:!h-[400px]` clamps the sidebar's `h-dvh` to the cage height
//   so it behaves like a viewport-tall sidebar in a 400 px "page".
export default () => (
  <div className="-m-4 h-[400px] overflow-y-auto overscroll-contain [&_aside]:!h-[400px] [&>div]:!min-h-0">
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
            {Array.from({ length: 20 }, (_, i) => (
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
