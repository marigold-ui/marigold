import { Tag } from '@marigold/components';

export default () => (
  <Tag.Group label="Audience type" selectionMode="multiple">
    <Tag id="families">Families</Tag>
    <Tag id="couples">Couples</Tag>
    <Tag id="students">Students</Tag>
    <Tag id="seniors">Seniors</Tag>
    <Tag id="tourists">Tourists</Tag>
  </Tag.Group>
);
