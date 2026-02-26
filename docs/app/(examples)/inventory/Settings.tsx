import { people } from '@/lib/data/people';
import { Bell, Shield, UserRound } from 'lucide-react';
import {
  Button,
  Checkbox,
  Columns,
  Headline,
  Select,
  Stack,
  Tabs,
  TextArea,
  TextField,
} from '@marigold/components';

const user = people.find(person => person.id === 'chippy')!;

export const Settings = () => (
  <Stack space={4}>
    <Headline level="2">Settings</Headline>
    <Tabs>
      <Tabs.List>
        <Tabs.Item id="profile">
          <UserRound className="size-4" /> Profile
        </Tabs.Item>
        <Tabs.Item id="security">
          <Shield className="size-4" /> Security
        </Tabs.Item>
        <Tabs.Item id="notifications">
          <Bell className="size-4" /> Notifications
        </Tabs.Item>
      </Tabs.List>
      <Tabs.TabPanel id="profile">
        <Columns columns={['fit', 1]} space={12}>
          <div className="w-32">
            <img
              src={user.avatar}
              alt={user.name}
              className="block w-32 rounded-full"
            />
          </div>
          <Stack space="regular" alignX="left">
            <TextField label="Full name" defaultValue={user.name} />
            <TextField label="Username" defaultValue={user.id} />
            <TextField
              label="Email address"
              type="email"
              defaultValue={user.email}
            />
            <TextArea
              label="Bio"
              defaultValue="Loves hiking and outdoor adventures. Coffee enthusiast. Avid reader of mystery novels."
              rows={3}
            />
            <Button variant="primary">Save</Button>
          </Stack>
        </Columns>
      </Tabs.TabPanel>
      <Tabs.TabPanel id="security">
        <Stack space="regular" alignX="left">
          <Checkbox
            label="Two-factor authentication (2FA)"
            description="Two-factor authentication adds an extra layer of security by
              requiring a second verification step in addition to your password."
            defaultChecked
          />
          <Checkbox label="Require password for sensitive actions" />
          <Button variant="primary">Save</Button>
        </Stack>
      </Tabs.TabPanel>
      <Tabs.TabPanel id="notifications">
        <Stack space="regular" alignX="left">
          <Select label="Email Digest Frequency" defaultValue="weekly">
            <Select.Option id="daily">Daily</Select.Option>
            <Select.Option id="weekly">Weekly</Select.Option>
            <Select.Option id="monthly">Monthly</Select.Option>
          </Select>
          <Checkbox.Group
            label="Notify me about"
            defaultValue={['follows', 'mentions']}
          >
            <Checkbox value="comments" label="New comments on my posts" />
            <Checkbox value="follows" label="New followers" />
            <Checkbox value="mentions" label="Mentions in comments" />
            <Checkbox
              value="updates"
              label="Product updates and announcements"
            />
          </Checkbox.Group>
          <Button variant="primary">Save</Button>
        </Stack>
      </Tabs.TabPanel>
    </Tabs>
  </Stack>
);
