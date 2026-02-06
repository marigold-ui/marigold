import { amenitiesOptions, venues } from '@/lib/data/venues';
import { useState } from 'react';
import {
  NumberField,
  NumericFormat,
  Select,
  Table,
  Text,
} from '@marigold/components';

export default () => {
  const [data, setData] = useState(() => venues.slice(3, 7));

  const update = (
    venueId: string,
    field: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(e.currentTarget);

    let next: any;
    switch (field) {
      case 'amenities':
        next = formData.getAll(field).map(Number);
        break;
      case 'rating':
        next = Number(formData.get(field));
        break;
      default:
        next = formData.get(field);
    }

    setData(prev =>
      prev.map(venue =>
        venue.id === venueId ? { ...venue, [field]: next } : venue
      )
    );
  };

  return (
    <Table aria-label="Editable venue data">
      <Table.Header>
        <Table.Column rowHeader>Venue</Table.Column>
        <Table.Column>Amenities</Table.Column>
        <Table.Column width={100}>Rating</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>
              <Text weight="medium">{venue.name}</Text>
            </Table.Cell>
            <Table.EditableCell
              onSubmit={e => update(venue.id, 'amenities', e)}
              field={
                <Select
                  aria-label="Amenities"
                  name="amenities"
                  selectionMode="multiple"
                  defaultValue={[...venue.amenities]}
                  autoFocus
                >
                  {amenitiesOptions.map((option, idx) => (
                    <Select.Option key={option} id={idx}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              }
            >
              {venue.amenities
                .map(amenity => amenitiesOptions[amenity])
                .join(', ')}
            </Table.EditableCell>
            <Table.EditableCell
              onSubmit={e => update(venue.id, 'rating', e)}
              field={
                <NumberField
                  aria-label="Rating"
                  name="rating"
                  defaultValue={venue.rating}
                  minValue={1}
                  maxValue={5}
                  step={0.1}
                  autoFocus
                />
              }
            >
              <NumericFormat
                value={venue.rating}
                minimumFractionDigits={1}
                maximumFractionDigits={1}
              />
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
