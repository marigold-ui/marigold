import type { ListViewProps } from '@marigold/components';
import {
  ActionMenu,
  Description,
  ListView,
  TextValue,
} from '@marigold/components';
import { FileText } from '@marigold/icons';

const files = [
  {
    id: 'report',
    name: 'Quarterly report',
    meta: 'Updated 3 days ago · 2.1 MB',
  },
  { id: 'roadmap', name: 'Roadmap', meta: 'Updated today · 640 KB' },
  { id: 'budget', name: 'Budget forecast', meta: 'Updated yesterday · 480 KB' },
];

export default (props: ListViewProps) => (
  <ListView {...props} aria-label="Resources">
    {files.map(file => (
      <ListView.Item key={file.id} id={file.id} textValue={file.name}>
        <FileText size={20} />
        <TextValue>{file.name}</TextValue>
        <Description>{file.meta}</Description>
        <ActionMenu aria-label={`${file.name} actions`}>
          <ActionMenu.Item>Rename</ActionMenu.Item>
          <ActionMenu.Item>Share</ActionMenu.Item>
          <ActionMenu.Item variant="destructive">Delete</ActionMenu.Item>
        </ActionMenu>
      </ListView.Item>
    ))}
  </ListView>
);
