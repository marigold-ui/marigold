import { useState } from 'react';
import { Multiselect } from '@marigold/components';

const ticketPriorities = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'critical', label: 'Critical Issue' },
];

export default () => {
  const [current, setCurrent] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<Array<object>>([]);

  return (
    <div className="flex h-[300px] flex-col">
      <Multiselect
        label="Ticket Priorities"
        placeholder="Set priorities..."
        items={ticketPriorities}
        isOptionDisabled={(item: { value: string }) =>
          item.value === 'critical'
        }
        onChange={value => setCurrent(value)}
        onSelectionChange={(selectedValues: object[]) =>
          setSelectedValues(selectedValues)
        }
      />
      <hr />
      <pre>
        Current Input: {current}
        <br />
        Selected Priorities:{' '}
        {selectedValues.map(({ value }: { value: string }) => value).join(', ')}
      </pre>
    </div>
  );
};
