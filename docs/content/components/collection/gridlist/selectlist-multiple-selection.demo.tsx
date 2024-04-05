import { useState } from 'react';

import { Button, SelectList } from '@marigold/components';

let pokemons = [
  { id: 'charizard', name: 'Charizard' },
  { id: 'blastoise', name: 'Blastoise' },
  { id: 'venusaur', name: 'Venusaur' },
  { id: 'pikachu', name: 'Pikachu' },
];

export default () => {
  const [selectedPokemons, setSelectedPokemons] = useState(['charizard']);
  return (
    <>
      <SelectList
        aria-label="Favorite pokemon"
        selectionMode="multiple"
        items={pokemons}
        selectedKeys={selectedPokemons}
        onChange={setSelectedPokemons}
      >
        {(item: { id: any; name: string }) => (
          <SelectList.Item id={item.id}>
            {item.name}
            <Button
              aria-label="Info"
              onPress={() => alert(`Info for ${item.name}...`)}
              className="ml-auto"
            >
              <svg width="30px" height="30px" viewBox="0 0 24 24">
                <path d="M12 2.85938C6.95437 2.85938 2.85938 6.95437 2.85938 12C2.85938 17.0456 6.95437 21.1406 12 21.1406C17.0456 21.1406 21.1406 17.0456 21.1406 12C21.1406 6.95437 17.0456 2.85938 12 2.85938ZM12.7875 15.9374H11.2125V11.2124H12.7875V15.9374ZM12.7875 9.6375H11.2125V8.0625H12.7875V9.6375Z"></path>
              </svg>
            </Button>
          </SelectList.Item>
        )}
      </SelectList>
      {selectedPokemons}
    </>
  );
};
