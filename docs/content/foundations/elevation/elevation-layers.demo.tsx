import { Text } from '@marigold/components';

export default () => (
  <div className="bg-background flex items-start gap-6 rounded-xl p-8">
    <div className="flex-1">
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
    <div className="ui-surface shadow-elevation-overlay shrink-0 self-center rounded-lg p-4">
      <Text fontSize="xs" color="secondary">
        shadow-elevation-overlay
      </Text>
    </div>
  </div>
);
