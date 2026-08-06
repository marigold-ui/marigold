import {
  Button,
  ButtonGroup,
  Description,
  Panel,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@marigold/components';
import { Bookmark, Settings, Share2 } from '@marigold/icons';

export default () => (
  <Panel>
    <Panel.Header>
      <Title>Event details</Title>
      <Description>Public information visible to ticket buyers.</Description>
      <ButtonGroup size="icon" aria-label="Event actions">
        <Tooltip.Trigger>
          <Button aria-label="Bookmark">
            <Bookmark />
          </Button>
          <Tooltip>Bookmark</Tooltip>
        </Tooltip.Trigger>
        <Tooltip.Trigger>
          <Button aria-label="Share">
            <Share2 />
          </Button>
          <Tooltip>Share</Tooltip>
        </Tooltip.Trigger>
        <Tooltip.Trigger>
          <Button aria-label="Settings">
            <Settings />
          </Button>
          <Tooltip>Settings</Tooltip>
        </Tooltip.Trigger>
      </ButtonGroup>
    </Panel.Header>
    <Panel.Content>
      <Stack space="tight">
        <Text weight="medium">Harborfront Jazz Festival</Text>
        <Text size="xs" color="secondary">
          Sunday, 22 June · 18:00 · Harborfront Promenade
        </Text>
      </Stack>
    </Panel.Content>
  </Panel>
);
