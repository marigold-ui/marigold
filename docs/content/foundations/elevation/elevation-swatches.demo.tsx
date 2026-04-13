import { Inline, Text } from '@marigold/components';

export default () => (
  <div className="bg-background rounded-xl p-8">
    <Inline space="regular">
      {[
        { shadow: 'shadow-elevation-border', label: 'Border' },
        { shadow: 'shadow-elevation-raised', label: 'Raised' },
        { shadow: 'shadow-elevation-overlay', label: 'Overlay' },
      ].map(({ shadow, label }) => (
        <div
          key={shadow}
          className={`bg-surface rounded-surface flex min-w-32 flex-col gap-1 p-6 ${shadow}`}
        >
          <Text weight="bold">{label}</Text>
          <Text fontSize="xs" color="secondary">
            {shadow}
          </Text>
        </div>
      ))}
    </Inline>
  </div>
);
