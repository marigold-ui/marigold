import { Bold, Italic, Underline } from 'lucide-react';
import { Inline, ToggleButton, Tooltip } from '@marigold/components';

export default () => (
  <Inline alignX="center">
    <ToggleButton.Group selectionMode="multiple" size="icon">
      <Tooltip.Trigger>
        <ToggleButton id="bold" aria-label="Bold">
          <Bold />
        </ToggleButton>
        <Tooltip>Bold</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger>
        <ToggleButton id="italic" aria-label="Italic">
          <Italic />
        </ToggleButton>
        <Tooltip>Italic</Tooltip>
      </Tooltip.Trigger>
      <Tooltip.Trigger>
        <ToggleButton id="underline" aria-label="Underline">
          <Underline />
        </ToggleButton>
        <Tooltip>Underline</Tooltip>
      </Tooltip.Trigger>
    </ToggleButton.Group>
  </Inline>
);
