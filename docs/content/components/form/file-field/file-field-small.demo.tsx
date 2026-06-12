import { FileField, Select, Stack } from '@marigold/components';

export default () => (
  <Stack space={'related'}>
    <Select label="Document type" size="small">
      <Select.Option id="terms">Terms and conditions</Select.Option>
      <Select.Option id="privacy">Privacy policy</Select.Option>
      <Select.Option id="contract">Contract</Select.Option>
    </Select>
    <FileField label="Upload document" size="small" accept={['.pdf']} />
  </Stack>
);
