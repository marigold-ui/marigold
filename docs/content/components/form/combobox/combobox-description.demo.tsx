import { ComboBox, Description, TextValue } from '@marigold/components';

export default () => (
  <ComboBox label="Permission">
    <ComboBox.Option id="read" textValue="Read">
      <TextValue>Read</TextValue>
      <Description>View files and comments only.</Description>
    </ComboBox.Option>
    <ComboBox.Option id="write" textValue="Write">
      <TextValue>Write</TextValue>
      <Description>Read and edit files in this project.</Description>
    </ComboBox.Option>
    <ComboBox.Option id="admin" textValue="Admin">
      <TextValue>Admin</TextValue>
      <Description>Full access including settings and billing.</Description>
    </ComboBox.Option>
  </ComboBox>
);
