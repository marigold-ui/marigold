import { Button, ButtonGroup, Tooltip } from '@marigold/components';
import { AtSign, Image, Link, Paperclip, SmilePlus } from '@marigold/icons';

export default () => (
  <ButtonGroup aria-label="Compose actions" variant="ghost" size="icon">
    <Tooltip.Trigger>
      <Button aria-label="Insert link">
        <Link />
      </Button>
      <Tooltip>Insert link</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Insert image">
        <Image />
      </Button>
      <Tooltip>Insert image</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Attach file">
        <Paperclip />
      </Button>
      <Tooltip>Attach file</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Mention someone">
        <AtSign />
      </Button>
      <Tooltip>Mention</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Insert emoji">
        <SmilePlus />
      </Button>
      <Tooltip>Emoji</Tooltip>
    </Tooltip.Trigger>
  </ButtonGroup>
);
