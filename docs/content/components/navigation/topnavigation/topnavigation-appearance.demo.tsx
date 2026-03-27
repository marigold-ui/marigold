import {
  Button,
  Inline,
  Sidebar,
  TopNavigation,
  TopNavigationProps,
} from '@marigold/components';

export default (props: TopNavigationProps) => (
  <Sidebar.Provider defaultOpen>
    <TopNavigation {...props}>
      <TopNavigation.Start>
        <Sidebar.Toggle />
      </TopNavigation.Start>
      <TopNavigation.Middle>
        <Inline space={4}>
          <Button variant="text">Home</Button>
          <Button variant="text">Events</Button>
          <Button variant="text">Settings</Button>
        </Inline>
      </TopNavigation.Middle>
      <TopNavigation.End>
        <Button variant="secondary" size="small">
          Sign in
        </Button>
      </TopNavigation.End>
    </TopNavigation>
  </Sidebar.Provider>
);
