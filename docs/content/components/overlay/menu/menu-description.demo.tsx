import { Description, Menu, TextValue } from '@marigold/components';

export default () => (
  <Menu label="File">
    <Menu.Item id="save" textValue="Save">
      <TextValue>Save</TextValue>
      <Description>Write the current document to disk.</Description>
    </Menu.Item>
    <Menu.Item id="save-and-exit" textValue="Save and exit">
      <TextValue>Save and exit</TextValue>
      <Description>Closes the editor after saving.</Description>
    </Menu.Item>
    <Menu.Item id="discard" textValue="Discard changes" variant="destructive">
      <TextValue>Discard changes</TextValue>
      <Description>Reverts unsaved edits. Cannot be undone.</Description>
    </Menu.Item>
  </Menu>
);
