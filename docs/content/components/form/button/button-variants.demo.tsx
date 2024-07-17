import { Button, Inline, useTheme } from '@marigold/components';

export default () => {
  const theme = useTheme();
  // Please don't do this in a regular app, this is just for the example!
  const variants = Object.keys(theme.components.Button?.variants!.variant!);
  // Core does not really have a secondary button, but this will fall back to the default 🤫
  if (theme.name === 'core') {
    variants.splice(1, 0, 'secondary');
  }

  return (
    <Inline space={2}>
      {variants.map(variant => (
        <Button variant={variant}>{variant}</Button>
      ))}
    </Inline>
  );
};
