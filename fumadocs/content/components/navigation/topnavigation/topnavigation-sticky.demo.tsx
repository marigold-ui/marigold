import {
  Breadcrumbs,
  Button,
  Inline,
  Stack,
  Text,
  TopNavigation,
} from '@marigold/components';

export default () => (
  <div style={{ height: '300px', overflow: 'auto' }}>
    <TopNavigation sticky>
      <TopNavigation.Start>
        <Inline space={2} alignY="center">
          <Text weight="bold">Acme Inc.</Text>
        </Inline>
      </TopNavigation.Start>
      <TopNavigation.Middle>
        <Breadcrumbs>
          <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Events</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">Event Details</Breadcrumbs.Item>
        </Breadcrumbs>
      </TopNavigation.Middle>
      <TopNavigation.End>
        <Button variant="secondary" size="small">
          Sign in
        </Button>
      </TopNavigation.End>
    </TopNavigation>
    <div style={{ padding: '2rem' }}>
      <Stack space={4}>
        <Text weight="bold" size="xl">
          Summer Festival
        </Text>
        <Text>
          Scroll this container to see the navigation stick to the top. The
          sticky behavior ensures users always have access to navigation, even
          when browsing long pages of content.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Text>
        <Text>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Text>
      </Stack>
    </div>
  </div>
);
