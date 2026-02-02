import { amenitiesOptions, venues } from '@/lib/data/venues';
import { NumberField, Select, Table, Text } from '@marigold/components';

export default () => (
  <Table aria-label="Editable venue data">
    <Table.Header>
      <Table.Column isRowHeader>Venue</Table.Column>
      <Table.Column>Amenities</Table.Column>
      <Table.Column width={100}>Rating</Table.Column>
    </Table.Header>
    <Table.Body>
      {venues.slice(3, 7).map(venue => (
        <Table.Row key={venue.id}>
          <Table.Cell>
            <Text weight="medium">{venue.name}</Text>
          </Table.Cell>
          <Table.EditableCell
            renderEditing={() => (
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
            )}
          >
            {venue.amenities
              .map(amenity => amenitiesOptions[amenity])
              .join(', ')}
          </Table.EditableCell>
          <Table.EditableCell
            renderEditing={() => (
              <NumberField
                aria-label="Rating"
                name="rating"
                defaultValue={venue.rating}
                minValue={1}
                maxValue={5}
                autoFocus
              />
            )}
          >
            {venue.rating}
          </Table.EditableCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
