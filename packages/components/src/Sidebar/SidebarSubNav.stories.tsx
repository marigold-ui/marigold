import preview from '.storybook/preview';
import { Headline } from '../Headline/Headline';
import { Text } from '../Text/Text';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  title: 'Components/Sidebar/SubNav',
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
              <Sidebar.SubNav>
                <Sidebar.MenuSub id="root" label="Main">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/dashboard">
                        Dashboard
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuSubTrigger submenuId="settings">
                        Settings
                      </Sidebar.MenuSubTrigger>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuSubTrigger submenuId="users">
                        Users
                      </Sidebar.MenuSubTrigger>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/analytics">
                        Analytics
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>

                <Sidebar.MenuSub id="settings" label="Settings">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/settings/general">
                        General
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/settings/security">
                        Security
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuSubTrigger submenuId="advanced">
                        Advanced
                      </Sidebar.MenuSubTrigger>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>

                <Sidebar.MenuSub id="advanced" label="Advanced">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/settings/advanced/api">
                        API Keys
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/settings/advanced/webhooks">
                        Webhooks
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/settings/advanced/logs">
                        Audit Logs
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>

                <Sidebar.MenuSub id="users" label="Users">
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/users/list">
                        All Users
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/users/roles">
                        Roles
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton href="/users/invites">
                        Invitations
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.MenuSub>
              </Sidebar.SubNav>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Text fontSize="xs">Logged in as admin</Text>
          </Sidebar.Footer>
        </Sidebar>
        <main className="flex-1 p-4">
          <Sidebar.Toggle />
          <Headline level={2}>SubNav Demo</Headline>
          <Text>
            Click a menu item with a chevron to navigate into a submenu. Use the
            back button to return.
          </Text>
        </main>
      </div>
    </Sidebar.Provider>
  ),
});
