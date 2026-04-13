import { Inline, Text } from '@marigold/components';

export default () => (
  <Inline space="regular">
    {[
      { className: 'bg-background', label: 'bg-background' },
      { className: 'bg-surface', label: 'bg-surface' },
      { className: 'bg-muted', label: 'bg-muted' },
    ].map(({ className, label }) => (
      <div
        key={label}
        className={`${className} flex min-w-32 flex-col gap-1 rounded-lg border border-black/10 p-6`}
      >
        <Text weight="bold" fontSize="sm">
          {label}
        </Text>
      </div>
    ))}
  </Inline>
);
