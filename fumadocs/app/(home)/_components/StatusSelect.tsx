import { Inline } from '@/ui';
import { Select } from '@marigold/components';

const Indicator = ({ color }: { color: string }) => (
  <span
    className={`size-3 rounded-full border border-solid border-white ${color}`}
  />
);

type Option = {
  id: string;
  label: string;
  color: string;
};

const options: Option[] = [
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

export const StatusSelect = () => {
  return (
    <Select
      label="Status"
      defaultSelectedKey="on-sale"
      width={44}
      items={options}
    >
      {(item: Option) => (
        <Select.Option id={item.id}>
          <Inline space={2} alignY="center">
            <Indicator color={item.color} />
            <span>{item.label}</span>
          </Inline>
        </Select.Option>
      )}
    </Select>
  );
};
