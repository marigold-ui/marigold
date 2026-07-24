import { Keyboard, Menu, TextValue } from '@marigold/components';
import { ClipboardPaste, Copy } from '@marigold/icons';

export default () => (
  <Menu label="Edit">
    <Menu.Item id="copy" textValue="Copy">
      <Copy />
      <TextValue>Copy</TextValue>
      <Keyboard>⌘C</Keyboard>
    </Menu.Item>
    <Menu.Item id="paste" textValue="Paste">
      <ClipboardPaste />
      <TextValue>Paste</TextValue>
      <Keyboard>⌘V</Keyboard>
    </Menu.Item>
  </Menu>
);
