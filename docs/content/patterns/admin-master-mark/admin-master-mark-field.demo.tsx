import {
  Badge,
  Checkbox,
  Select,
  Stack,
  TextField,
} from '@marigold/components';

export default () => (
  <Stack space={4}>
    <TextField label="Organizer Name" width="1/2" defaultValue="Lumen Events" />
    <Select label="Organizer Type" width={48} defaultSelectedKey={'promoter'}>
      <Select.Option id="agency">Agency</Select.Option>
      <Select.Option id="venue">Venue</Select.Option>
      <Select.Option id="promoter">Promoter</Select.Option>
      <Select.Option id="freelancer">Freelancer</Select.Option>
    </Select>
    <Select
      label={
        <>
          Associated Team <Badge variant="master">Master</Badge>
        </>
      }
      width={56}
      defaultSelectedKey={'regional'}
    >
      <Select.Option id="inbound">Inbound Sales</Select.Option>
      <Select.Option id="outbound">Outbound Sales</Select.Option>
      <Select.Option id="keyaccounts">Key Accounts</Select.Option>
      <Select.Option id="regional">Regional Sales</Select.Option>
    </Select>
    <Checkbox
      label={
        <>
          Enable Diagnostics <Badge variant="admin">Admin</Badge>
        </>
      }
      defaultChecked
    />
  </Stack>
);
