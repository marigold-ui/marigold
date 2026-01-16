import { Inline, Stack } from '@marigold/components';
import preview from '../../../.storybook/preview';

const meta = preview.meta({
  title: 'Styles/RUI',
});

export const Surface = meta.story({
  render: () => (
    <Stack space="group">
      <Inline space="peer">
        <div className="ui-surface aspect-video h-32"></div>
        <div className="ui-surface ui-elevation-overlay aspect-video h-32"></div>
      </Inline>
      <Inline space="peer">
        <div className="ui-surface ui-state-disabled aspect-video h-32"></div>
        <div className="ui-surface ui-state-error aspect-video h-32"></div>
      </Inline>
    </Stack>
  ),
});
