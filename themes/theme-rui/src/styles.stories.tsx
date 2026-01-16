import { Inline } from '@marigold/components';
import preview from '../../../.storybook/preview';

const meta = preview.meta({
  title: 'Styles/RUI',
});

export const Surface = meta.story({
  render: () => (
    <Inline space="peer">
      <div className="surface shadow-elevation-base size-72"></div>
      <div className="surface shadow-elevation-raised size-72"></div>
      <div className="surface shadow-elevation-overlay size-72"></div>
    </Inline>
  ),
});
