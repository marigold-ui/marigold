import { AtSign, Image, Link, Paperclip, SmilePlus } from 'lucide-react';
import { ActionButton, Stack, TextArea, Tooltip } from '@marigold/components';

export default () => (
  <Stack space={1}>
    <ActionButton.Group aria-label="Compose actions" size="small">
      <Tooltip.Trigger>
        <ActionButton aria-label="Insert link">
          <Link />
        </ActionButton>
        <Tooltip>Insert link</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger>
        <ActionButton aria-label="Insert image">
          <Image />
        </ActionButton>
        <Tooltip>Insert image</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger>
        <ActionButton aria-label="Attach file">
          <Paperclip />
        </ActionButton>
        <Tooltip>Attach file</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger>
        <ActionButton aria-label="Mention someone">
          <AtSign />
        </ActionButton>
        <Tooltip>Mention</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger>
        <ActionButton aria-label="Insert emoji">
          <SmilePlus />
        </ActionButton>
        <Tooltip>Emoji</Tooltip>
      </Tooltip.Trigger>
    </ActionButton.Group>
    <TextArea aria-label="Comment" placeholder="Write a comment..." />
  </Stack>
);
