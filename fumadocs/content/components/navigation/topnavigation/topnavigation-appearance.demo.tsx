import {
  Button,
  Inline,
  Text,
  TopNavigation,
  TopNavigationProps,
} from '@marigold/components';

export default (props: TopNavigationProps) => (
  <TopNavigation {...props}>
    <TopNavigation.Start>
      <Inline space={2} alignY="center">
        <Text weight="bold">Acme Inc.</Text>
      </Inline>
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
);
