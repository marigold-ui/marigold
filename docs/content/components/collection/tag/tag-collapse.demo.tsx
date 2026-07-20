import { Tag } from '@marigold/components';

export default () => (
  <Tag.Group
    label="Genres"
    selectionMode="multiple"
    collapseAt={5}
    defaultSelectedKeys={['rock', 'hiphop']}
  >
    <Tag id="pop">Pop</Tag>
    <Tag id="rock">Rock</Tag>
    <Tag id="hiphop">Hip-Hop</Tag>
    <Tag id="electronic">Electronic</Tag>
    <Tag id="classical">Classical</Tag>
    <Tag id="jazz">Jazz</Tag>
    <Tag id="country">Country</Tag>
    <Tag id="rnb">R&amp;B</Tag>
    <Tag id="metal">Metal</Tag>
    <Tag id="reggae">Reggae</Tag>
  </Tag.Group>
);
