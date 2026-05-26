import { Inline, ToggleButton } from '@marigold/components';

export default () => (
  <Inline alignX="center">
    <ToggleButton.Group selectionMode="multiple" size="small">
      <ToggleButton id="grid">Show grid</ToggleButton>
      <ToggleButton id="snap">Snap</ToggleButton>
      <ToggleButton id="ruler">Show ruler</ToggleButton>
    </ToggleButton.Group>
  </Inline>
);
