import {
  ActionMenu,
  Description,
  ListView,
  TextValue,
} from '@marigold/components';
import { FileText } from '@marigold/icons';

export default () => (
  <ListView aria-label="Resources">
    <ListView.Item id="report" textValue="Quarterly report">
      <FileText size={20} />
      <TextValue>Quarterly report</TextValue>
      <Description>Updated 3 days ago · 2.1 MB</Description>
      <ActionMenu aria-label="Quarterly report actions">
        <ActionMenu.Item>Rename</ActionMenu.Item>
        <ActionMenu.Item>Share</ActionMenu.Item>
        <ActionMenu.Item variant="destructive" size="icon">
          Delete
        </ActionMenu.Item>
      </ActionMenu>
    </ListView.Item>
    <ListView.Item id="roadmap" textValue="Roadmap">
      <FileText size={20} />
      <TextValue>Roadmap</TextValue>
      <Description>Updated today · 640 KB</Description>
      <ActionMenu aria-label="Roadmap actions">
        <ActionMenu.Item>Rename</ActionMenu.Item>
        <ActionMenu.Item>Share</ActionMenu.Item>
        <ActionMenu.Item variant="destructive" size="icon">
          Delete
        </ActionMenu.Item>
      </ActionMenu>
    </ListView.Item>
  </ListView>
);
