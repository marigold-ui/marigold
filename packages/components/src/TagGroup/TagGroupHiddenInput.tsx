import { useContext } from 'react';
import { ListStateContext } from 'react-aria-components';

export interface TagGroupHiddenInputProps {
  name: string;
}
export const TagGroupHiddenInput = ({ name }: TagGroupHiddenInputProps) => {
  const state = useContext(ListStateContext);
  const selectedKeys = Array.from(state?.selectionManager.selectedKeys ?? []);

  if (!selectedKeys.length) return null;

  return (
    <div hidden aria-hidden="true">
      {selectedKeys.map(key => (
        <input
          key={key}
          type="checkbox"
          name={name}
          value={key}
          checked
          readOnly
        />
      ))}
    </div>
  );
};
