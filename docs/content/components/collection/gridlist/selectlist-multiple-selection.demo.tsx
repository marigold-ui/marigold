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
              ⓘ
            </Button>
          </SelectList.Item>
        )}
      </SelectList>
      {selectedPokemons}
    </>
  );
};
