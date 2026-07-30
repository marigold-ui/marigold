import { Text } from '@marigold/components';

export default () => (
  <div className="bg-background rounded-xl p-8">
    <div className="bg-surface rounded-surface shadow-elevation-overlay flex min-w-32 flex-col gap-1 p-6">
      <Text weight="bold">Overlay</Text>
      <Text fontSize="xs" color="secondary">
        shadow-elevation-overlay
      </Text>
    </div>
  </div>
);
