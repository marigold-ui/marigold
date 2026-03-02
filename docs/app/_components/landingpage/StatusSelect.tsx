import { Inline, Select } from '@/ui';

const Indicator = ({ color }: { color: string }) => (
  <span
    className={`size-3 rounded-full border border-solid border-white ${color}`}
  />
);

const options = [
  {
    id: 'draft',
    label: 'Draft',
    color: 'bg-blue-500',
  },
  {
    id: 'presale',
    label: 'Presale',
    color: 'bg-yellow-500',
  },
  {
    id: 'on-sale',
    label: 'On Sale',
    color: 'bg-green-500',
  },
  {
    id: 'inactive',
    label: 'Inactive',
    color: 'bg-red-500',
  },
];

export const StatusSelect = () => (
  <Select label="Status" defaultValue="on-sale" width={44}>
    {options.map(o => (
      <Select.Option key={o.id} id={o.id}>
        <Inline space={2} alignY="center">
          <Indicator color={o.color} />
          <span>{o.label}</span>
        </Inline>
      </Select.Option>
    ))}
  </Select>
);
