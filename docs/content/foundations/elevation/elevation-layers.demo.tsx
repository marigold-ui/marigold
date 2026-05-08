import { Text } from '@marigold/components';

export default () => (
  <div className="bg-background rounded-xl p-8">
    <Text fontSize="xs" color="secondary">
      bg-background
    </Text>
    <div className="bg-surface mt-2 rounded-lg p-6">
      <Text fontSize="xs" color="secondary">
        bg-surface
      </Text>
      <div className="bg-muted mt-2 rounded-md p-4">
        <Text fontSize="xs" color="secondary">
          bg-muted
        </Text>
      </div>
    </div>
  </div>
);
