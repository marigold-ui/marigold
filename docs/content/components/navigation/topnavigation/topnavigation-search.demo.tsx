import {
  Button,
  SearchField,
  Sidebar,
  TopNavigation,
} from '@marigold/components';

export default () => (
  <Sidebar.Provider defaultOpen>
    <TopNavigation>
      <TopNavigation.Start>
        <Sidebar.Toggle />
      </TopNavigation.Start>
      <TopNavigation.Middle aria-label="Search" alignX="center">
        <SearchField placeholder="Search..." />
      </TopNavigation.Middle>
      <TopNavigation.End>
        <Button variant="secondary" size="small">
          Sign in
        </Button>
      </TopNavigation.End>
    </TopNavigation>
  </Sidebar.Provider>
);
