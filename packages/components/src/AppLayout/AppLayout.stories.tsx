import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Block } from '../__internal__/Block';
import { AppLayout } from './AppLayout';

const meta = preview.meta({
  title: 'Components/AppLayout',
  component: AppLayout,
});

export const Basic = meta.story({
  render: () => (
    <AppLayout>
      <AppLayout.Sidebar>
        <Block className="h-full w-64 rounded-none">Sidebar</Block>
      </AppLayout.Sidebar>
      <AppLayout.Header>
        <Block className="rounded-none">Header</Block>
      </AppLayout.Header>
      <AppLayout.Main>
        <Block className="h-full rounded-none">Main</Block>
      </AppLayout.Main>
    </AppLayout>
  ),
});

export const ScrollableContent = meta.story({
  render: () => (
    <AppLayout>
      <AppLayout.Sidebar>
        <Block className="h-full w-64 rounded-none">Sidebar</Block>
      </AppLayout.Sidebar>
      <AppLayout.Header>
        <Block className="rounded-none">Header</Block>
      </AppLayout.Header>
      <AppLayout.Main>
        <Stack space={4}>
          {Array.from({ length: 50 }, (_, i) => (
            <Block key={i}>Item {i + 1}</Block>
          ))}
        </Stack>
      </AppLayout.Main>
    </AppLayout>
  ),
});
