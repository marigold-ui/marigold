import { Bookmark, Settings, Share2 } from 'lucide-react';
import {
  ActionButton,
  Panel,
  Stack,
  Text,
  Tooltip,
} from '@marigold/components';

export default () => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Event details</Panel.Title>
      <Panel.Description>
        Public information visible to ticket buyers.
      </Panel.Description>
      <Panel.HeaderActions>
        <ActionButton.Group aria-label="Event actions" size="small">
          <Tooltip.Trigger>
            <ActionButton aria-label="Bookmark">
              <Bookmark />
            </ActionButton>
            <Tooltip>Bookmark</Tooltip>
          </Tooltip.Trigger>
          <Tooltip.Trigger>
            <ActionButton aria-label="Share">
              <Share2 />
            </ActionButton>
            <Tooltip>Share</Tooltip>
          </Tooltip.Trigger>
          <Tooltip.Trigger>
            <ActionButton aria-label="Settings">
              <Settings />
            </ActionButton>
            <Tooltip>Settings</Tooltip>
          </Tooltip.Trigger>
        </ActionButton.Group>
      </Panel.HeaderActions>
    </Panel.Header>
    <Panel.Content>
      <Stack space={1}>
        <Text weight="medium">Harborfront Jazz Festival</Text>
        <Text size="xs" color="secondary">
          Sunday, 22 June · 18:00 · Harborfront Promenade
        </Text>
      </Stack>
    </Panel.Content>
  </Panel>
);
