import { useState } from 'react';
import { ComboBox, Stack, Text } from '@marigold/components';

export default () => {
  const [inputValue, setInputValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  return (
    <Stack space={4}>
      <ComboBox
        label="Projects"
        value={inputValue}
        onChange={setInputValue}
        allowsCustomValue
        allowsEmptyCollection
        onSelectionChange={key => setSelectedKey(key as string)}
      >
        {inputValue.length > 0 && (
          <ComboBox.Option
            id="create"
            textValue={`Create ${inputValue}`}
            onAction={() => setLastAction(`Creating "${inputValue}"...`)}
          >
            Create new &quot;{inputValue}&quot; Project
          </ComboBox.Option>
        )}
        <ComboBox.Section key="actions" header="Actions">
          <ComboBox.Option
            id="new"
            onAction={() => setLastAction('Create new file...')}
          >
            New file
          </ComboBox.Option>
          <ComboBox.Option
            id="open"
            onAction={() =>
              setLastAction(`Opening details for file ${selectedKey}...`)
            }
          >
            Open
          </ComboBox.Option>
        </ComboBox.Section>
        <ComboBox.Section key="files" header="Files">
          <ComboBox.Option id="file-1">
            Top Secret - RUI Initative
          </ComboBox.Option>
          <ComboBox.Option id="file-2">Tech Radar</ComboBox.Option>
          <ComboBox.Option id="file-3">Who is Claude?</ComboBox.Option>
        </ComboBox.Section>
      </ComboBox>
      <Text weight="black">Selected:</Text> {selectedKey ?? 'None'}
      <Text weight="black">Last action:</Text> {lastAction ?? 'None'}
    </Stack>
  );
};
