import {
  Button,
  Inline,
  SearchField,
  Text,
  TopNavigation,
} from '@marigold/components';

export default () => (
  <TopNavigation>
    <TopNavigation.Start>
      <Inline space={2} alignY="center">
        <Text weight="bold">Acme Inc.</Text>
      </Inline>
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
);
