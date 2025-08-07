import React, { useState } from 'react';
import {
  Button,
  Center,
  ComboBox,
  SearchField,
  Stack,
  Text,
} from '@marigold/components';

type StateType = 'no-results' | 'no-data' | 'loading' | 'error';

// Ticket types data
const ticketTypes = [
  { id: '1', name: 'Login Issue' },
  { id: '2', name: 'Payment Failed' },
  { id: '3', name: 'Bug Report' },
  { id: '4', name: 'Feature Request' },
  { id: '5', name: 'Account Setup' },
  { id: '6', name: 'Performance Issue' },
  { id: '7', name: 'Security Concern' },
  { id: '8', name: 'API Integration' },
];

function EmptyStateContent({
  type,
  searchQuery,
}: {
  type: StateType;
  searchQuery?: string;
}) {
  switch (type) {
    case 'no-results':
      return (
        <Center>
          <Stack space={2}>
            <Text size="large" weight="semibold">
              No results found
            </Text>
            <Text color="gray">
              No items match "{searchQuery}". Try adjusting your search.
            </Text>
            <Button variant="secondary">Clear search</Button>
          </Stack>
        </Center>
      );

    case 'no-data':
      return (
        <Center>
          <Stack space={2}>
            <Text size="large" weight="semibold">
              No items available
            </Text>
            <Text color="gray">There are currently no items to display.</Text>
            <Button variant="primary">Add new item</Button>
          </Stack>
        </Center>
      );

    case 'loading':
      return (
        <Center>
          <Stack space={2}>
            <div
              style={{
                width: '24px',
                height: '24px',
                border: '2px solid #3b82f6',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
              }}
            ></div>
            <Text color="gray">Loading items...</Text>
          </Stack>
        </Center>
      );

    case 'error':
      return (
        <Center>
          <Stack space={2}>
            <Text size="large" weight="semibold" color="error">
              Failed to load data
            </Text>
            <Text color="gray">Unable to load items. Please try again.</Text>
            <Button variant="secondary">Retry</Button>
          </Stack>
        </Center>
      );

    default:
      return null;
  }
}

export default function EmptyStatesDemo() {
  const [selectedState, setSelectedState] = useState<StateType>('no-results');
  const [searchQuery, setSearchQuery] = useState('xyz');

  const getFilteredItems = () => {
    if (selectedState === 'loading') return [];
    if (selectedState === 'error') return [];
    if (selectedState === 'no-data') return [];
    if (selectedState === 'no-results') {
      return ticketTypes.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return ticketTypes;
  };

  const filteredItems = getFilteredItems();

  return (
    <Stack space={6}>
      <div>
        <Text weight="semibold">Select empty state to preview:</Text>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '8px',
          }}
        >
          {[
            { key: 'no-results', label: 'No Search Results' },
            { key: 'no-data', label: 'No Data Available' },
            { key: 'loading', label: 'Loading State' },
            { key: 'error', label: 'Error State' },
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={selectedState === key ? 'primary' : 'secondary'}
              onPress={() => setSelectedState(key as StateType)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {selectedState === 'no-results' && (
        <SearchField
          label="Search items"
          value={searchQuery}
          onChange={setSearchQuery}
          description="Try searching for 'Login' to see results"
        />
      )}

      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {filteredItems.length === 0 ? (
          <EmptyStateContent type={selectedState} searchQuery={searchQuery} />
        ) : (
          <div style={{ padding: '16px', width: '100%' }}>
            <Text weight="semibold">Items found:</Text>
            <ComboBox label="Select item" items={filteredItems}>
              {(item: any) => (
                <ComboBox.Option key={item.id} id={item.id}>
                  {item.name}
                </ComboBox.Option>
              )}
            </ComboBox>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Stack>
  );
}
