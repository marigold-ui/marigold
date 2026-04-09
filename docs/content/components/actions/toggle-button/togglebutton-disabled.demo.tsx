import { Bold, Italic, Strikethrough, Underline } from 'lucide-react';
import { Stack, Text, ToggleButton } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Stack space={1} alignX="left">
      <Text weight="bold">Individual disabled button</Text>
      <ToggleButton.Group selectionMode="multiple" size="icon">
        <ToggleButton id="bold" aria-label="Bold">
          <Bold />
        </ToggleButton>
        <ToggleButton id="italic" aria-label="Italic">
          <Italic />
        </ToggleButton>
        <ToggleButton id="strikethrough" aria-label="Strikethrough" disabled>
          <Strikethrough />
        </ToggleButton>
        <ToggleButton id="underline" aria-label="Underline">
          <Underline />
        </ToggleButton>
      </ToggleButton.Group>
    </Stack>
    <Stack space={1} alignX="left">
      <Text weight="bold">Entire group disabled</Text>
      <ToggleButton.Group selectionMode="multiple" size="icon" disabled>
        <ToggleButton id="bold" aria-label="Bold">
          <Bold />
        </ToggleButton>
        <ToggleButton id="italic" aria-label="Italic">
          <Italic />
        </ToggleButton>
        <ToggleButton id="underline" aria-label="Underline">
          <Underline />
        </ToggleButton>
      </ToggleButton.Group>
    </Stack>
  </Stack>
);
