import { useState } from 'react';
import type { Key } from '@react-types/shared';
import { ComboBox, Stack, Text } from '@marigold/components';

export default () => {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  return (
    <Stack space={4}>
      <ComboBox label="Projects" menuTrigger="focus" onChange={setSelectedKey}>
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
