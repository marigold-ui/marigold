import {
  AppShell,
  Description,
  Page,
  Panel,
  Sidebar,
  Text,
  Title,
  TopNavigation,
} from '@marigold/components';
import { DemoViewport } from '@/ui/DemoViewport';

export default () => (
  <DemoViewport>
    <AppShell defaultSidebarOpen>
      <Sidebar>
        <Sidebar.Header>
          <span className="text-sm font-medium">Logo</span>
        </Sidebar.Header>
        <Sidebar.Nav>
          <Sidebar.Item href="#">Navigation 1</Sidebar.Item>
          <Sidebar.Item href="#">Navigation 2</Sidebar.Item>
          <Sidebar.Item href="#">Navigation 3</Sidebar.Item>
        </Sidebar.Nav>
      </Sidebar>
      <TopNavigation>
        <TopNavigation.Start>
          <Sidebar.Toggle />
        </TopNavigation.Start>
        <TopNavigation.Middle>
          <span className="text-sm">Breadcrumbs</span>
        </TopNavigation.Middle>
        <TopNavigation.End>
          <span className="text-sm">User Menu</span>
        </TopNavigation.End>
      </TopNavigation>
      <Page>
        <Page.Header>
          <Title>Dashboard</Title>
          <Description>An overview of your workspace.</Description>
        </Page.Header>
        {Array.from({ length: 3 }, (_, i) => (
          <Panel key={i}>
            <Panel.Header>
              <Title>Section {i + 1}</Title>
            </Panel.Header>
            <Panel.Content>
              <Text size="sm">Panel content</Text>
            </Panel.Content>
          </Panel>
        ))}
      </Page>
    </AppShell>
  </DemoViewport>
);
