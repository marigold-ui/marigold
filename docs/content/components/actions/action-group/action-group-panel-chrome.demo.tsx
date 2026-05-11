import { Bookmark, Settings, Share2 } from 'lucide-react';
import {
  ActionButton,
  ActionGroup,
  Description,
  Panel,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@marigold/components';

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Event details</Title>
      <Description>Public information visible to ticket buyers.</Description>
      <ActionGroup aria-label="Event actions">
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
      </ActionGroup>
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
