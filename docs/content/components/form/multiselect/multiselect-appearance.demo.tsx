import { Tag } from '@marigold/components';

export default () => (
  <Tag.Group
    label="Ticket Categories"
    selectionMode="multiple"
    defaultSelectedKeys={['general', 'vip']}
  >
    <Tag id="general">General Admission</Tag>
    <Tag id="vip">VIP Experience</Tag>
    <Tag id="backstage" isDisabled>
      Backstage Pass
    </Tag>
    <Tag id="early">Early Bird Special</Tag>
  </Tag.Group>
);
