import preview from '.storybook/preview';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  title: 'Components/Sidebar/Nav',
  component: Sidebar,
  parameters: {
    padding: false,
  },
});

export const Basic = meta.story({
  render: () => (
    <Sidebar.Provider>
      <div className="flex h-screen">
        <Sidebar>
          <Sidebar.Header>
            <Text weight="bold">Admin Panel</Text>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.Nav>
                <Sidebar.Item href="/dashboard">Dashboard</Sidebar.Item>
                <Sidebar.Item id="settings" textValue="Settings">
                  Settings
                  <Sidebar.Item href="/settings/general">General</Sidebar.Item>
                  <Sidebar.Item href="/settings/security">
                    Security
                  </Sidebar.Item>
                  <Sidebar.Item id="advanced" textValue="Advanced">
                    Advanced
                    <Sidebar.Item href="/settings/advanced/api">
                      API Keys
                    </Sidebar.Item>
                    <Sidebar.Item href="/settings/advanced/webhooks">
                      Webhooks
                    </Sidebar.Item>
                    <Sidebar.Item href="/settings/advanced/logs">
                      Audit Logs
                    </Sidebar.Item>
                  </Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.Item id="users" textValue="Users">
                  Users
                  <Sidebar.Item href="/users/list">All Users</Sidebar.Item>
                  <Sidebar.Item href="/users/roles">Roles</Sidebar.Item>
                  <Sidebar.Item href="/users/invites">Invitations</Sidebar.Item>
                </Sidebar.Item>
                <Sidebar.Item href="/analytics">Analytics</Sidebar.Item>
              </Sidebar.Nav>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text fontSize="xs">Logged in as admin</Text>
          </Sidebar.Footer>
        </Sidebar>
        <main className="flex-1 p-4">
          <Sidebar.Toggle />
          <Headline level={2}>Nav Demo</Headline>
          <Text>
            Click a menu item with a chevron to navigate into a submenu. Use the
            back button to return.
          </Text>
        </main>
      </div>
    </Sidebar.Provider>
  ),
});
