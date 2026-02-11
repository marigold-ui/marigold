import { Bold, Italic, Underline } from 'lucide-react';
import { ToggleButton, ToggleButtonGroupProps } from '@marigold/components';

export default (props: ToggleButtonGroupProps) => (
  <ToggleButton.Group {...props}>
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
);
