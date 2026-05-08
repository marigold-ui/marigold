import { Button, Stack, Tag, TagGroup, TextField } from '@marigold/components';

export default () => (
  <Stack space="regular" alignX="left">
    <TextField label="Name" placeholder="Jane Doe" />
    <TagGroup label="Categories" selectionMode="single">
      <Tag id="music">Music</Tag>
      <Tag id="outdoor">Outdoor</Tag>
      <Tag id="family">Family</Tag>
    </TagGroup>
    <Button variant="secondary">Save</Button>
  </Stack>
);
