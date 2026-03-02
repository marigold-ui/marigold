import { ComboBox, useAsyncList } from '@marigold/components';

export default () => {
  const list = useAsyncList<{ name: string }>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        {
          signal,
        }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });
  return (
    <ComboBox
      label="Star Wars Character Lookup"
      value={list.filterText}
      onChange={list.setFilterText}
      items={list.items}
    >
      {(item: { name: string }) => (
        <ComboBox.Option id={item.name}>{item.name}</ComboBox.Option>
      )}
    </ComboBox>
  );
};
