import { FileField, Stack } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <FileField
      label="Upload PDF document"
      accept={['application/pdf', '.pdf']}
    />
    <FileField label="Upload image" accept={['image/*']} />
  </Stack>
);
