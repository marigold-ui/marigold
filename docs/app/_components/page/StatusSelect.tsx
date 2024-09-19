import { FieldGroup, Inline, Select, Text } from '@/ui';

const Indicator = ({ color }: { color: string }) => (
  <span
    className={`size-3 rounded-full border border-solid border-white ${color}`}
  />
);

const options = [
  {
    id: 'backlog',
    label: 'Backlog',
    color: 'bg-gray-500',
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    color: 'bg-blue-500',
  },
  {
    id: 'in-review',
    label: 'In Review',
    color: 'bg-yellow-500',
  },
  {
    id: 'done',
    label: 'Done',
    color: 'bg-green-500',
  },
  {
    id: 'wont-do',
    label: "Won't do",
    color: 'bg-red-500',
  },
];

export const StatusSelect = () => (
  <FieldGroup labelWidth="40px">
    <Select
      label="Status"
      defaultSelectedKey="in-progress"
      disabledKeys={['wont-do']}
      width={44}
    >
      {options.map(o => (
        <Select.Option key={o.id} id={o.id}>
          <Inline space={2} alignY="center">
            <Indicator color={o.color} />
            <span>{o.label}</span>
          </Inline>
        </Select.Option>
      ))}
    </Select>
  </FieldGroup>
);
