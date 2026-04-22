import preview from '.storybook/preview';
import { useResponsiveValue, useTheme } from '@marigold/system';

const meta = preview.meta({
  title: 'System/useResponsiveValue',
});

const colors = [
  'bg-yellow-500',
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-gray-500',
];

const Component = () => {
  const theme = useTheme();
  const screenEntries = Object.entries(theme.screens ?? {});

  const labels = [
    `base (< ${screenEntries[0]?.[1]})`,
    ...screenEntries.map(([name, value]) => `${name} (>= ${value})`),
  ];

  const index = useResponsiveValue(
    labels.map((_, i) => i),
    0
  );

  return (
    <div
      className={`${colors[index % colors.length]} flex items-center justify-center rounded-lg p-8 text-lg font-bold text-white`}
    >
      <span>Active breakpoint: {labels[index]}</span>
    </div>
  );
};

export const Basic = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Resize the browser window to see the active breakpoint change.
      </p>
      <Component />
    </div>
  ),
});
