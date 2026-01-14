import { useState } from 'react';
import { Multiselect } from '@marigold/components';

interface TicketPriority {
  value: string;
  label: string;
}

const ticketPriorities: TicketPriority[] = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'critical', label: 'Critical Issue' },
];

export default function TicketPrioritySelect() {
  const [current, setCurrent] = useState('');
  const [selectedValues, setSelectedValues] = useState<TicketPriority[]>([]);

  return (
    <div className="flex h-75 flex-col">
      <Multiselect
        label="Ticket Priorities"
        placeholder="Set priorities..."
        items={ticketPriorities}
        isOptionDisabled={item => (item as TicketPriority).value === 'critical'}
        onChange={setCurrent}
        onSelectionChange={values =>
          setSelectedValues(values as TicketPriority[])
        }
      />

      <hr />

      <pre>
        Current Input: {current}
        <br />
        Selected Priorities: {selectedValues.map(item => item.value).join(', ')}
      </pre>
    </div>
  );
}
